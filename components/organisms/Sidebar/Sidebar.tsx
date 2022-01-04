import MenuSection from '../../molecules/MenuSection/MenuSection';
import { menu } from '../../../utils/menu';
import Link from 'next/link';
const Sidebar = () => {  
  return (
    <nav id="sidebar_wrapper">
            <Link href="/">
               <a className="menuSectionHeader">HomePage</a>
            </Link> 
            <MenuSection sectionName="Data Science" sectionLinks={menu.dataScience} />
            <MenuSection sectionName="Kategorie" sectionLinks={menu.categories} />
            <MenuSection sectionName="Serie" sectionLinks={menu.serie} />
            <Link href="/contact">
               <a className="menuSectionHeader">Contact</a>
            </Link> 
            <MenuSection sectionName="Admin" sectionLinks={menu.admin} />
    </nav>
  );
};

export default Sidebar;
