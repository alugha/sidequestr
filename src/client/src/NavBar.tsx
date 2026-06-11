import type React from "react";
import {BottomNavigation, type BottomNavigationSelectEvent} from '@progress/kendo-react-layout'
import { cameraIcon, homeIcon } from '@progress/kendo-svg-icons';
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

interface Props {
    children: React.ReactNode;
}

const navItems = [
   { text: 'Home', svgIcon: homeIcon, route: '/', selected: true },
   { text: 'Scan', svgIcon: cameraIcon, route: '/scan' },
];

const NavBar: React.FC<Props> =({children})=> {
    const navigate = useNavigate();
    const [selectedIdx, setSelectedIdx] = useState(0);

    const onSelect = (ev: BottomNavigationSelectEvent) => {
        navigate(ev.itemTarget.route);
        setSelectedIdx(ev.itemIndex);
    };

    const items = useMemo(() => 
        navItems.map((i,idx)=>({...i, selected:idx===selectedIdx})),
        [selectedIdx]
    );

    return <>
        <main className="content">{children}</main>
        <BottomNavigation items={items} onSelect={onSelect}></BottomNavigation>
        <style>
            {`
                .k-bottom-nav  {
                    padding: 0;
                    gap: 0;
                }

                .k-bottom-nav-item {
                    border-radius: 0;
                }

                .content {
                    padding:5px;
                }
            `}
        </style>
    </>
}

export default NavBar;