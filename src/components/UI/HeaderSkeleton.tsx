const HeaderSkeleton = () => {
  return (
    <header>
      <nav className="p-4 flex justify-between items-center animate-pulse">
        <div className="flex items-center gap-4">
          {/* Logo Skeleton */}
          <div className="w-12 h-12 bg-muted rounded-full" />

          {/* Nav Links Skeleton */}
          <ul className="flex gap-4">
            <li className="w-20 h-6 bg-muted rounded" />
            <li className="w-24 h-6 bg-muted rounded" />
          </ul>
        </div>

        {/* Right Side Buttons Skeleton */}
        <ul className="flex gap-4">
          <li>
            <div className="w-20 h-8 bg-muted rounded" />
          </li>
          <li>
            <div className="w-20 h-8 bg-muted rounded" />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderSkeleton;
