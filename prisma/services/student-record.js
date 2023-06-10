import { GradeLevel, Program, TransactionStatus } from '@prisma/client';
import prisma from '@/prisma/index';

export const countEnrolledStudentsByGradeLevel = async (startDate, endDate) => {
  const filterDate =
    startDate && endDate
      ? {
          AND: [
            { createdAt: { gte: new Date(startDate) } },
            { createdAt: { lte: new Date(endDate) } },
          ],
        }
      : {};
  const result = await prisma.studentRecord.groupBy({
    by: ['incomingGradeLevel'],
    where: {
      ...filterDate,
      deletedAt: null,
      student: {
        deletedAt: null,
        schoolFees: {
          some: {
            transaction: {
              paymentStatus: TransactionStatus.S,
            },
          },
        },
      },
    },
    _count: { incomingGradeLevel: true },
  });
  const data = {
    [GradeLevel.PRESCHOOL]: 0,
    [GradeLevel.K1]: 0,
    [GradeLevel.K2]: 0,
    [GradeLevel.GRADE_1]: 0,
    [GradeLevel.GRADE_2]: 0,
    [GradeLevel.GRADE_3]: 0,
    [GradeLevel.GRADE_4]: 0,
    [GradeLevel.GRADE_5]: 0,
    [GradeLevel.GRADE_6]: 0,
    [GradeLevel.GRADE_7]: 0,
    [GradeLevel.GRADE_8]: 0,
    [GradeLevel.GRADE_9]: 0,
    [GradeLevel.GRADE_10]: 0,
    [GradeLevel.GRADE_11]: 0,
    [GradeLevel.GRADE_12]: 0,
  };
  result.forEach((level) => {
    data[level.incomingGradeLevel] = level._count.incomingGradeLevel;
  });
  return data;
};

export const countUsedDiscountCode = async (code) =>
  await prisma.studentRecord.count({ where: { discount: code } });

export const countEnrolledStudentsByProgram = async (startDate, endDate) => {
  const filterDate =
    startDate && endDate
      ? {
          AND: [
            { createdAt: { gte: new Date(startDate) } },
            { createdAt: { lte: new Date(endDate) } },
          ],
        }
      : {};
  const result = await prisma.studentRecord.groupBy({
    by: ['program'],
    where: {
      ...filterDate,
      deletedAt: null,
      student: {
        deletedAt: null,
        schoolFees: {
          some: {
            transaction: {
              paymentStatus: TransactionStatus.S,
            },
          },
        },
      },
    },
    _count: { program: true },
  });
  const data = {
    [Program.HOMESCHOOL_COTTAGE]: 0,
    [Program.HOMESCHOOL_PROGRAM]: 0,
  };
  result.forEach((level) => {
    data[level.program] = level._count.program;
  });
  return data;
};

export const countEnrolledStudents = async (startDate, endDate) => {
  const filterDate =
    startDate && endDate
      ? {
          AND: [
            { createdAt: { gte: new Date(startDate) } },
            { createdAt: { lte: new Date(endDate) } },
          ],
        }
      : {};
  return await prisma.studentRecord.count({
    where: {
      ...filterDate,
      deletedAt: null,
      student: {
        deletedAt: null,
        schoolFees: {
          some: {
            transaction: {
              paymentStatus: TransactionStatus.S,
            },
          },
        },
      },
    },
  });
};

export const countStudents = async (startDate, endDate) => {
  const filterDate =
    startDate && endDate
      ? {
          AND: [
            { createdAt: { gte: new Date(startDate) } },
            { createdAt: { lte: new Date(endDate) } },
          ],
        }
      : {};

  return await prisma.studentRecord.count({
    where: {
      ...filterDate,
      deletedAt: null,
      student: { deletedAt: null },
    },
  });
};

export const countStudentsByGradeLevel = async () =>
  await prisma.studentRecord.groupBy({
    by: ['incomingGradeLevel'],
    _count: true,
    where: { deletedAt: null, student: { deletedAt: null } },
  });

export const countStudentsByProgram = async () =>
  await prisma.studentRecord.groupBy({
    by: ['program'],
    _count: true,
    where: { deletedAt: null, student: { deletedAt: null } },
  });

export const createStudentRecord = async (
  id,
  firstName,
  middleName,
  lastName,
  birthDate,
  gender,
  religion,
  incomingGradeLevel,
  enrollmentType,
  program,
  cottageType,
  accreditation,
  reason,
  formerSchoolName,
  formerSchoolAddress,
  image,
  liveBirthCertificate,
  reportCard,
  discount
) =>
  await prisma.studentRecord.create({
    data: {
      studentId: id,
      firstName,
      middleName,
      lastName,
      birthDate,
      gender,
      religion,
      incomingGradeLevel,
      enrollmentType,
      program,
      cottageType,
      accreditation,
      reason,
      formerSchoolName,
      formerSchoolAddress,
      image,
      liveBirthCertificate,
      reportCard,
      discount,
    },
  });

export const updateFile = async (studentId, type, url) => {
  let data = {};

  switch (type) {
    case 'image': {
      data.image = url;
      break;
    }
    case 'birth': {
      data.liveBirthCertificate = url;
      break;
    }
    case 'card': {
      data.reportCard = url;
      break;
    }
    default:
      return;
  }

  await prisma.studentRecord.update({
    data,
    where: { studentId },
  });
};

export const getStudentRecords = async () =>
  await prisma.studentRecord.findMany({
    orderBy: [{ createdAt: 'desc' }],
    select: {
      studentId: true,
      firstName: true,
      middleName: true,
      lastName: true,
      birthDate: true,
      gender: true,
      religion: true,
      incomingGradeLevel: true,
      enrollmentType: true,
      program: true,
      accreditation: true,
      reason: true,
      formerSchoolName: true,
      formerSchoolAddress: true,
      image: true,
      liveBirthCertificate: true,
      reportCard: true,
      student: {
        select: {
          creator: {
            select: {
              guardianInformation: true,
            },
          },
          schoolFees: {
            select: {
              order,
              paymentType,
              transaction: {
                select: {
                  transactionId: true,
                  transactionStatus: true,
                  amount: true,
                  paymentReference: true,
                  paymentStatus: true,
                  message: true,
                  referenceNumber: true,
                },
              },
            },
            orderBy: [{ order: 'desc' }],
          },
        },
      },
    },
    where: {
      deletedAt: null,
      student: {
        deletedAt: null,
        schoolFees: {
          some: {
            transaction: {
              paymentStatus: TransactionStatus.S,
            },
          },
        },
      },
    },
  });
