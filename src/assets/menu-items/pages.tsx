// assets
import { IconKey, IconLogin } from '@tabler/icons';

// constant
const icons = {
    IconKey,
    IconLogin
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Pages',
    type: 'group',
    children: [
        {
            id: 'test',
            title: 'Login',
            type: 'item',
            url: 'test',
            icon: icons.IconLogin,
            breadcrumbs: false
        }
    ]
};

export default pages;