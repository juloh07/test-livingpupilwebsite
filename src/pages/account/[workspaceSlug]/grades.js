import Content from '@/components/Content/index';
import Meta from '@/components/Meta';
import { AccountLayout } from '@/layouts/index';
import Card from '@/components/Card';

const Grades = () => {
  return (
    <AccountLayout>
      <Meta title="Living Pupil Homeschool - Student Grades" />
      <Content.Title
        title="Student Grades"
        subtitle="View your student's grades"
      />
      <Content.Divider />
      <Content.Container>
        <Card>
          <Card.Body
            title="This is where you can manage your student's grades"
            subtitle="You may visit our Facebook page for more details and updates"
          >
            <a
              className="w-full py-2 text-center rounded-lg text-primary-500 bg-secondary-500 hover:bg-secondary-600 disabled:opacity-25"
              href="https://www.facebook.com/livingpupilhomeschool"
              target="_blank"
            >
              Visit Facebook Page
            </a>
          </Card.Body>
        </Card>
      </Content.Container>
    </AccountLayout>
  );
};

export default Grades;