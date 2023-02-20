import { Dispatch, ReactElement, SetStateAction } from 'react';
import Button from 'common/Buttons/Button';
import { ISection } from 'pages/Staff/Staff';

interface Props {
  className?: string;
  setSelectedSection: Dispatch<SetStateAction<ISection>>;
  selectedSection: ISection;
  sections: Array<ISection>;
}

export default function StaffNavBar({ className, sections, setSelectedSection, selectedSection }: Props): ReactElement {
  return (
    <div className={className}>
      {sections.map((section) =>
        section.title === selectedSection.title ? (
          <Button
            key={section.title}
            hover={false}
            colour="grey"
            onClick={() => setSelectedSection(section)}
            className="mx-12 h-[32px] px-[16px] py-[4px] text-base"
          >
            {section.title}
          </Button>
        ) : (
          <Button
            key={section.title}
            hover={false}
            colour="clear"
            onClick={() => setSelectedSection(section)}
            className="mx-12 h-[32px] px-[16px] py-[4px] text-base"
          >
            {section.title}
          </Button>
        )
      )}
    </div>
  );
}
