import { Button } from 'components/Button/Button';
import { ISection } from 'pages/Staff/Staff';
import { Dispatch, ReactElement, SetStateAction } from 'react';

interface Props {
  className?: string;
  setSelectedSection: Dispatch<SetStateAction<ISection>>;
  selectedSection: ISection;
  sections: Array<ISection>;
}

export const StaffNavBar = ({ className, sections, setSelectedSection, selectedSection }: Props): ReactElement => {
  return (
    <div className={className}>
      {sections.map((section) =>
        section.title === selectedSection.title ? (
          <Button key={section.title} hover={false} size="medium" colour={'grey'} onClick={() => setSelectedSection(section)} className="mx-10">
            {section.title}
          </Button>
        ) : (
          <Button key={section.title} size="medium" colour={'clear'} bg="dark" onClick={() => setSelectedSection(section)} className="mx-10">
            {section.title}
          </Button>
        )
      )}
    </div>
  );
};
