import { Button } from 'components/Buttons/Button';
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
          <Button
            key={section.title}
            hover={false}
            size="large"
            colour="grey"
            onClick={() => setSelectedSection(section)}
            className="mx-12 text-base"
          >
            {section.title}
          </Button>
        ) : (
          <Button
            key={section.title}
            hover={false}
            size="large"
            colour="clear"
            onClick={() => setSelectedSection(section)}
            className="mx-12 text-base"
          >
            {section.title}
          </Button>
        )
      )}
    </div>
  );
};
