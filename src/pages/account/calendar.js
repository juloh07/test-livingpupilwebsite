import Content from '@/components/Content/index';
import Meta from '@/components/Meta';
import { AccountLayout } from '@/layouts/index';
import Card from '@/components/Card';

const Calendar = () => {
  return (
    <AccountLayout>
      <Meta title="Living Pupil Homeschool - School Calendar" />
      <Content.Title
        title="Calendar of Events"
        subtitle="View your school calendar of events"
      />
      <Content.Divider />
      <Content.Container>
        <Card>
          <Card.Body
            title="A list of calendar events and school activities will be displayed here"
            subtitle="You may visit our Facebook page for more details"
          >
            <a
              className="w-full py-2 text-center rounded-lg text-primary-500 bg-secondary-500 hover:bg-secondary-600 disabled:opacity-50"
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

export default Calendar;