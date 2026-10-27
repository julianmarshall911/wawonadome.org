import { type IconName, iconPaths } from './iconPaths';

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

// Decorative icon; pair it with visible text or an aria-label on its parent.
export default function Icon({ name, size = 24, className }: IconProps) {
  return (
    <svg
      viewBox='0 0 24 24'
      width={size}
      height={size}
      fill='currentColor'
      aria-hidden='true'
      focusable='false'
      className={className}>
      {iconPaths[name].map(d => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
