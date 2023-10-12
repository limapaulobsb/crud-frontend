import { FormEvent } from 'react';

export type Entry = {
  name: string;
  email: string;
  phoneNumber: string;
  id?: number;
};

export type ContactDetailsProps = { params: { id: string } };

export type FormProps = {
  handleSubmit: (event: FormEvent, inputValues: Entry) => Promise<void>;
  initialValues: Entry;
  disabled?: boolean;
};
