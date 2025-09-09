interface HeaderProps {
  title: string;
  subtitle?: string;
  showNavigation?: boolean;
}

const Header = ({ title, subtitle, showNavigation = false }: HeaderProps) => {
  return (
    <header className="border-b border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>

        {showNavigation && (
          <nav className="flex items-center space-x-4">
            <button className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors">
              チャット
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
