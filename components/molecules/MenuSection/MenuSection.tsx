import { NextRouter, useRouter } from 'next/router';
import Link from 'next/link';

interface MenuSectionProps {
  sectionName: string;
  sectionLinks: {
    name: string;
    linkPath: string;
    icon: string;
  }[];
}

const MenuSection: React.FC<MenuSectionProps> = ({ sectionName, sectionLinks }) => {
  const router: NextRouter = useRouter();
  
  return (
    <div className="section-name mt-2 mb-2">
      <a className="menuSectionHeader ">{sectionName}</a>
      <ul>
        {sectionLinks.map((link) => (
          <li key={link.linkPath} className='my-1 menu-list-item'>
            <Link href={link.linkPath}>
            <a className={link.linkPath === router.asPath? 'active' : ''}>
              <i className={link.icon}></i>
              {link.name}
            </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuSection;