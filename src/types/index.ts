import { FormEvent } from 'react';

export type Entry = {
  id?: string;
  email: string;
  name: string;
  phoneNumber: string;
};

export type ContactProps = { params: { id: string } };

export type ContactItemProps = { contact: Entry };

export type ContactListProps = { contacts: Entry[] };

export type FormProps = {
  ariaLabel: string;
  initialValues: Entry;
  handleSubmit: (event: FormEvent<HTMLFormElement>, inputValues: Entry) => Promise<void>;
  disabled?: boolean;
};

export type HeaderProps = {
  heading: string;
  navLinks?: [string, string][];
};
