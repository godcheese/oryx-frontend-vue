
<script type="text/jsx">
  export default {
    name: "Menu",
    functional: true,
    props: {
      menuData: {
        type: Array,
        default: []
      }
    },
    render(h, context) {
      const {menuData} = context.props;
      const nodes = [];
      const getSubMenu = item => {
        if (item.children && item.children.some(child => child.name)) {
          const children = getMenu(item.children); // eslint-disable-line
          // 当无子菜单时就不展示菜单
          if (children && children.length > 0) {
            return (<a-sub-menu key={item.url || item.id} title={item.icon ? (<span><a-icon type={item.icon}/><span>{item.name}</span></span>) : (<span>{item.name}</span>)}>{children}</a-sub-menu>);
          }
          return null;
        } else {
          // return (<a-menu-item key={item.url}>{item.name}</a-menu-item>);
          return (<a-menu-item key={item.url || item.id}>{item.icon ? (<span><a-icon type={item.icon}/><span>{item.name}</span></span>) : (<span>{item.name}</span>)}</a-menu-item>);
        }
      };

      const getMenu = menu => {
        if (!menu) {
          return [];
        }
        return menu.map(item => {
          return getSubMenu(item);
        });
      };

      const dom = getMenu(menuData);
      nodes.push(dom);
      return nodes;
    }
  }
</script>
