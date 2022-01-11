const { ethers } = require('hardhat');
const chai = require('chai');
const { solidity } = require('ethereum-waffle');

chai.use(solidity);
const { expect } = chai;

describe('Reaper Token', function () {
  let data = {
    reaperToken: undefined,
    killedToken: undefined,
    killer: '',
    id1: 100,
  };
  beforeEach(async () => {
    [data.killer] = await ethers.getSigners();

    const Reaper = await ethers.getContractFactory('Reaper');
    const Killed = await ethers.getContractFactory('MockERC721');
    data.reaperToken = await Reaper.deploy(
      'Reaper',
      'REAP',
      'https://api.reaper.io/tokens/'
    );
    data.killedToken = await Killed.deploy();
    await data.reaperToken.deployed();
    await data.killedToken.deployed();
  });

  it('corectly burns NFT from killer to reaper', async () => {
    const { reaperToken, killer, id1 } = data;
    const killedToken = data.killedToken.connect(killer);
    const killedAddress = await killer.getAddress();
    const minted = await killedToken.mint(id1, { from: killedAddress });
    await minted.wait();
    const balance = await killedToken.balanceOf(killedAddress);
    expect(balance.toNumber()).to.equal(1);

    await killedToken.approve(reaperToken.address, id1, {
      from: killedAddress,
    });

    expect(await killedToken.getApproved(id1)).to.equal(reaperToken.address);

    const transfer = await reaperToken.burnExternalToken(
      killedToken.address,
      id1,
      { from: killedAddress }
    );
    transfer.wait();

    const reaperTokenId = await reaperToken.tokenOfOwnerByIndex(
      killedAddress,
      0
    );

    expect(await reaperToken.ownerOf(reaperTokenId)).to.equal(killedAddress);

    //Check proof of burn
    const proof = await reaperToken.proofOfBurn(reaperTokenId);
    expect(proof.tokenAddress).to.equal(killedToken.address);
    expect(proof.tokenId).to.equal(id1.toString());
  });
});
