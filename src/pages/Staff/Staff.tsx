import { ReactElement, useState } from 'react';
import { PageLayout } from 'components/PageLayout/PageLayout';
import { StaffNavBar } from 'components/StaffNavBar/StaffNavBar';
import { StaffDetails } from 'components/StaffBody/Details';
import { StaffInventory } from 'components/StaffBody/Inventory';
import { StaffCategories } from 'components/StaffBody/Categories';
import { StaffTags } from 'components/StaffBody/Tags';
import { StaffOrders } from 'components/StaffBody/Orders';

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
      <div className="staff font-poppins font-300 flex h-full flex-col items-center">
        <a className="items-center p-6 text-4xl">Administrator</a>
        <StaffNavBar setSelectedSection={setselectedSection} selectedSection={selectedSection} sections={sections} className="p-6" />
        {sections.map((section) => (section.title === selectedSection.title ? section.component : null))}
      </div>
    </PageLayout>
  );
};
