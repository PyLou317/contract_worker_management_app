import TabMenuItem from '@/components/NavBars/TopNavTabItem';

export default function NavTabs({ tabItems }) {
  return (
    <div className="container ms-auto px-4">
      <ul className="flex flex-row gap-1 justify-start">
        {tabItems.map((item) => (
          <TabMenuItem name={item.name} Icon={item.icon} path={item.path} />
        ))}
      </ul>
    </div>
  );
}
