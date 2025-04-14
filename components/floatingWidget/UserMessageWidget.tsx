type UserMessageWidgetProp = React.HTMLAttributes<HTMLDivElement>;

export default function UserMessageWidget({ children }: UserMessageWidgetProp) {
  return (
    <div
      className={`font-IBM text-black bg-chatColors-linkWater rounded-lg mb-2 p-2 mr-2 max-w-[70%] 
      break-words ml-auto w-fit`}
    >
      {children}
    </div>
  );
}
