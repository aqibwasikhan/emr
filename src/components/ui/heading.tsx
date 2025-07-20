interface HeadingProps {
  title: string;
  description?: string;
}

export const Heading: React.FC<HeadingProps> = ({ title, description }: HeadingProps) => {
  return (
    <div>
      <h2 className='text-base 2xl:text-xl font-bold tracking-tight text-[var(--pri-grey-1)]'>{title}</h2>
      <p className='text-sm text-[var(--pri-grey-1)]'>{description}</p>
    </div>
  );
};
