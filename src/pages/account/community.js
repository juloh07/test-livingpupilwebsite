import Content from '@/components/Content/index';
import Meta from '@/components/Meta';
import { AccountLayout } from '@/layouts/index';
import Card from '@/components/Card';
import { FaFacebook } from 'react-icons/fa';
import Image from 'next/image';

const Community = () => {
  return (
    <AccountLayout>
      <Meta title="Living Pupil Homeschool - Living Pupil Homeschool Community" />
      <Content.Title
        title="Living Pupil Homeschool Community"
        subtitle="View your Living Pupil Homeschool Community and circle"
      />
      <Content.Divider />
      <Content.Container>
        <Card>
          <Card.Body
            title="A list of links to the various communities of Living Pupil Homeschool"
            subtitle="You may visit our Facebook page for more details"
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

      <div className="flex flex-row md:flex-col">
        <div className="w-1/3 md:w-full">
          <div className="flex flex-col md:flex-row bg-water-500 pt-28">
            <Image
              alt="Living Pupil Homeschool"
              src="/images/livingpupil-homeschool-logo.png"
              width={150}
              height={150}
            />
            <span className="text-lg text-primary-500">
              Living Pupil Community
            </span>
          </div>
        </div>
        <div className="flex flex-wrap"></div>
      </div>
    </AccountLayout>
  );
};

export default Community;
