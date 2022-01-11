import React from 'react';
import Button, { Actions } from './Button';
import Input from './Input';
import { useReaperForm } from '../hooks';

const ReaperForm = () => {
  const {
    token_id,
    token_address,
    errors,
    submittable,
    handleSubmit,
    handleReset,
    ...inputProps
  } = useReaperForm();
  return (
    <>
      <Input
        name={'token_address'}
        label={'Token Address'}
        placeholder={'Token Address'}
        value={token_address}
        error={errors[token_address]}
        {...inputProps}
      />
      <Input
        name={'token_id'}
        label={'Token ID'}
        placeholder={'Token ID'}
        value={token_id}
        error={errors[token_id]}
        {...inputProps}
      />
      <Actions>
        <Button
          label={'Destroy'}
          disabled={!submittable}
          onClick={handleSubmit}
        />
        <Button label={'Reset'} secondary onClick={handleReset} />
      </Actions>
    </>
  );
};

export default ReaperForm;
