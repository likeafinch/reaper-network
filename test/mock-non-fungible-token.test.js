const { ethers } = require('hardhat');
const chai = require('chai');
const { solidity } = require('ethereum-waffle');

chai.use(solidity);
const { expect } = chai;

describe('NFT To Be Killed', function () {
  let data = {
    killedToken: undefined,
    killer: '',
    mustard: '',
    scarlet: '',
    id1: 100,
    id2: 13,
  };
  beforeEach(async () => {
    [data.killer, data.mustard, data.scarlet] = await ethers.getSigners();

    const Killed = await ethers.getContractFactory('MockERC721');
    data.killedToken = await Killed.deploy();
    await data.killedToken.deployed();
  });
  it('correctly mints a NFT to be killed', async () => {
    const { killedToken, killer, id1 } = data;
    const killedAddress = await killer.getAddress();
    const logs = await killedToken.mint(id1, { from: killedAddress });
    expect(await logs.wait()).to.not.equal(undefined);
    const balance = await killedToken.balanceOf(killedAddress);
    expect(balance.toNumber()).to.equal(1);
  });

  it('returns correct balanceOf', async () => {
    const { id1, id2, mustard } = data;
    const mustardAddress = await mustard.getAddress();
    const killedToken = data.killedToken.connect(mustard);
    let balance = await killedToken.balanceOf(mustardAddress);
    expect(balance.toNumber()).to.equal(0);
    let minted = await killedToken.mint(id1, { from: mustardAddress });

    expect(await minted.wait()).to.not.equal(undefined);
    balance = await killedToken.balanceOf(mustardAddress);
    expect(balance.toNumber()).to.equal(1);

    minted = await killedToken.mint(id2, { from: mustardAddress });

    expect(await minted.wait()).to.not.equal(undefined);
    balance = await killedToken.balanceOf(mustardAddress);
    expect(balance.toNumber()).to.equal(2);
  });
  it('finds the correct killer of NFTToken id', async () => {
    const { killer, id1 } = data;
    const killedToken = data.killedToken.connect(killer);
    const killedAddress = await killer.getAddress();
    const minted = await killedToken.mint(id1, { from: killedAddress });
    await minted.wait();
    expect(await killedToken.ownerOf(id1)).equal(killedAddress);
  });
  it('correctly approves account', async () => {
    const { killer, scarlet, id1 } = data;
    const killedToken = data.killedToken.connect(killer);
    const killedAddress = await killer.getAddress();
    const scarletAddress = await scarlet.getAddress();
    const minted = await killedToken.mint(id1, { from: killedAddress });
    await minted.wait();

    await killedToken.approve(scarletAddress, id1, { from: killedAddress });

    expect(await killedToken.getApproved(id1)).to.equal(scarletAddress);
  });
});
