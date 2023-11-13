import { Form } from 'react-bootstrap';
import { SectionType } from '../types.d';

interface Props {
  type: SectionType;
  value: string;
  loading?: boolean;
  onChange: (value: string) => void;
}

const commonStyles = { height: '150px', border: 0, resize: 'none' };
const getPlaceholder = ({
  type,
  loading
}: {
  type: SectionType;
  loading?: boolean;
}) => {
  if (type === SectionType.From) return 'Introducir texto';
  if (loading === true) return 'Traduciendo...';
  return 'Traducción';
};

export const TextArea = ({ loading, type, value, onChange }: Props) => {
  const styles =
    type === SectionType.From
      ? commonStyles
      : { ...commonStyles, backgroundColor: '#f5f5f5' };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <Form.Control
      as='textarea'
      placeholder={getPlaceholder({ type, loading })}
      autoFocus={type === SectionType.From}
      style={styles}
      value={value}
      onChange={handleChange}
      disabled={type === SectionType.To && loading === true}
    />
  );
};
