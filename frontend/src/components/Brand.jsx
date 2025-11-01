export default function BrandLogoAndName({ className, sidebarOpen }) {
  let brandName = '';
  if (!sidebarOpen) {
    brandName = '';
  } else {
    brandName = 'the HIVE';
  }

  return (
    <>
      <h1 className={className}>
        <span className="text-yellow-100">
          <i className="fa-solid fa-hexagon"></i>
        </span>{' '}
        <span>{brandName}</span>
      </h1>
    </>
  );
}
