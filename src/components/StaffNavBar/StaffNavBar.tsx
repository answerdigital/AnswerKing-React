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
      {sections.map((section, id) =>
        section.title === selectedSection.title ? (
          <Button key={id} hover={false} size="medium" colour={'grey'} onClick={() => setSelectedSection(section)} className="mx-10">
            {section.title}
          </Button>
        ) : (
          <Button key={id} size="medium" colour={'clear'} onClick={() => setSelectedSection(section)} className="mx-10">
            {section.title}
          </Button>
        )
      )}
    </div>
  );
};
