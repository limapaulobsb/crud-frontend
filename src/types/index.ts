import { FormEvent } from 'react';

export type Entry = {
  id?: number;
  email: string;
  name: string;
  phoneNumber: string;
};

export type ContactDetailsProps = { params: { id: string } };

export type FormProps = {
  handleSubmit: (event: FormEvent, inputValues: Entry) => Promise<void>;
  initialValues: Entry;
  disabled?: boolean;
};

export type HeaderProps = {
  heading: string;
  navLinks?: [string, string][];
};
