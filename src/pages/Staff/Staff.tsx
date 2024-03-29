import { ReactElement, useState } from 'react';
import PageLayout from 'common/PageLayout/PageLayout';
import { SearchContextProvider } from 'common/Search/SearchContext';
import StaffCategories from './components/StaffBody/StaffCategories';
import StaffDetails from './components/StaffBody/StaffDetails';
import StaffInventory from './components/StaffBody/StaffInventory';
import StaffOrders from './components/StaffBody/StaffOrders';
import StaffTags from './components/StaffBody/StaffTags';
import StaffNavBar from './components/StaffNavBar/StaffNavBar';

export interface ISection {
  title: string;
  component: ReactElement;
}

export default function StaffPage(): ReactElement {
  const sections: ISection[] = [
    { title: 'Details', component: StaffDetails() },
    { title: 'Inventory', component: StaffInventory() },
    { title: 'Categories', component: StaffCategories() },
    { title: 'Tags', component: StaffTags() },
    { title: 'Orders', component: StaffOrders() },
  ];
  const [selectedSection, setselectedSection] = useState<ISection>(sections[0]);

  return (
    <PageLayout title="Admin - Answer King">
      <div className="staff font-poppins font-200 flex h-full flex-col items-center p-14">
        <a className="items-center text-4xl font-extralight" href="/staff">
          Administrator
        </a>
        <StaffNavBar setSelectedSection={setselectedSection} selectedSection={selectedSection} sections={sections} className="p-6" />
        <SearchContextProvider>
          {sections.map((section) => (section.title === selectedSection.title ? section.component : null))}
        </SearchContextProvider>
      </div>
    </PageLayout>
  );
}
