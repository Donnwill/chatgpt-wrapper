type StrongtagWidgetProp = React.HTMLAttributes<HTMLDivElement>;

export default function StrongtagWidget({ children }: StrongtagWidgetProp) {
  return <strong className={`font-IBMSemiBold`}>{children}</strong>;
}
