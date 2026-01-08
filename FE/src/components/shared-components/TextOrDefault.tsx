type Props = {
  text?: string | null;
  defaultText?: string;
  className?: string;
};

export const TextOrDefault = ({
  text,
  defaultText = 'Chưa cập nhật',
  className = 'text-red-500',
}: Props) => {
  return (
    <span className={text ? '' : `${className} italic`}>
      {text || defaultText}
    </span>
  );
};
