// assets
import { IconKey, IconLogin, IconMathSymbols, IconDevices, IconSettings } from '@tabler/icons';

// constant
const icons = {
    IconKey,
    IconLogin,
    IconMathSymbols,
    IconDevices,
    IconSettings
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Pages',
    type: 'group',
    children: [
        {
            id: 'software',
            title: "Software",
            type: "item",
            url: "software",
            icon: icons.IconMathSymbols,
            breadcrumbs: false
        },
        {
            id: 'devices',
            title: "Devices",
            type: "item",
            url: "devices",
            icon: icons.IconDevices,
            breadcrumbs: false
        },
        {
            id: 'device-types',
            title: "Device Types",
            type: "item",
            url: "device-types",
            icon: icons.IconSettings,
            breadcrumbs: false
        }
    ]
};

export default pages;