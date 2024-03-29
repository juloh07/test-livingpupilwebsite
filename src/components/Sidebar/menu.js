import Item from './item';

const Menu = ({
  data,
  isLoading,
  menuCondition,
  showMenu,
  validate = false,
}) => {
  return showMenu ? (
    <div className="space-y-2">
      <h5 className="text-sm font-bold text-secondary-500">{data.name}</h5>
      <ul className="ml-5 leading-10">
        {data.menuItems.map((entry, index) =>
          (entry.showDefault && (
            <Item key={index} data={entry} isLoading={isLoading} />
          )) ||
          (menuCondition &&
            entry.validateItem &&
            entry.validateItem(validate)) ? (
            <Item key={index} data={entry} isLoading={isLoading} />
          ) : null
        )}
      </ul>
    </div>
  ) : null;
};

Menu.defaultProps = {
  isLoading: false,
  showMenu: false,
};

export default Menu;
