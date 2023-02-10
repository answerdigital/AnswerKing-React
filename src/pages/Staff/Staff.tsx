import { ReactElement, useState } from 'react';
import { PageLayout } from 'components/PageLayout/PageLayout';
import { StaffNavBar } from 'components/StaffNavBar/StaffNavBar';
import { StaffDetails } from 'components/StaffBody/StaffDetails';
import { StaffInventory } from 'components/StaffBody/StaffInventory';
import { StaffCategories } from 'components/StaffBody/StaffCategories';
import { StaffTags } from 'components/StaffBody/StaffTags';
import { StaffOrders } from 'components/StaffBody/StaffOrders';
import { SearchContextProvider } from 'components/Search/SearchContext';

export interface ISection {
  title: string;
  component: ReactElement;
}

export const StaffPage = (): ReactElement => {
  const sections: ISection[] = [
    { title: 'Details', component: StaffDetails() },
    { title: 'Inventory', component: StaffInventory() },
    { title: 'Categories', component: StaffCategories() },
    { title: 'Tags', component: StaffTags() },
    { title: 'Orders', component: StaffOrders() },
  ];
  const [selectedSection, setselectedSection] = useState<ISection>(sections[0]);

  return (
    <PageLayout title={'Admin - Answer King'}>
      <div className="staff font-poppins font-200 flex h-full flex-col items-center p-14">
        <a className="items-center text-4xl font-extralight">Administrator</a>
        <StaffNavBar setSelectedSection={setselectedSection} selectedSection={selectedSection} sections={sections} className="p-6" />
        <SearchContextProvider>
          {sections.map((section) => (section.title === selectedSection.title ? section.component : null))}
        </SearchContextProvider>
      </div>
    </PageLayout>
  );
};
