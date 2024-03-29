import Content from '@/components/Content/index';
import Meta from '@/components/Meta';
import { AccountLayout } from '@/layouts/index';
import Card from '@/components/Card';
import { useWorkspace } from '@/providers/workspace';
import JotFormEmbed from 'react-jotform-embed';
import { GradeLevel } from '@prisma/client';

const forms = {
  [GradeLevel.K2]: '231091044111438',
  [GradeLevel.GRADE_1]: '230861217347455',
  [GradeLevel.GRADE_2]: '230861217347455',
  [GradeLevel.GRADE_3]: '230861217347455',
  [GradeLevel.GRADE_4]: '231090829906460',
  [GradeLevel.GRADE_5]: '231090829906460',
  [GradeLevel.GRADE_6]: '231090829906460',
  [GradeLevel.GRADE_7]: '231090829906460',
  [GradeLevel.GRADE_8]: '231090829906460',
  [GradeLevel.GRADE_9]: '231090829906460',
  [GradeLevel.GRADE_10]: '231090829906460',
};

const Grades = () => {
  const { workspace } = useWorkspace();

  return (
    <AccountLayout>
      <Meta title="Living Pupil Homeschool - Student Grades" />
      <Content.Title
        title="Student Grades"
        subtitle="View your student's grades"
      />
      <Content.Divider />

      {workspace &&
        workspace?.studentRecord?.incomingGradeLevel &&
        forms[workspace?.studentRecord?.incomingGradeLevel] && (
          <JotFormEmbed
            src={`https://form.jotform.com/${
              forms[workspace?.studentRecord?.incomingGradeLevel]
            }`}
            scrolling={true}
          />
        )}
    </AccountLayout>
  );
};

export default Grades;
