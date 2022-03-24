let grade = {};
grade.primaryList = [
  {
    grade: "9999",
    label: "全部"
  },
  {
    grade: 1,
    label: "一年级"
  },
  {
    grade: 2,
    label: "二年级"
  },
  {
    grade: 3,
    label: "三年级"
  },
  {
    grade: 4,
    label: "四年级"
  },
  {
    grade: 5,
    label: "五年级"
  },
  {
    grade: 6,
    label: "六年级"
  }
];
grade.middleList = [
  {
    grade: "9999",
    label: "全部"
  },
  {
    grade: 7,
    label: "七年级"
  },
  {
    grade: 8,
    label: "八年级"
  },
  {
    grade: 9,
    label: "九年级"
  }
];
grade.highList = [
  {
    grade: "9999",
    label: "全部"
  },
  {
    grade: 10,
    label: "高一"
  },
  {
    grade: 11,
    label: "高二"
  },
  {
    grade: 12,
    label: "高三"
  }
]
grade.collegeList = [
  {
    grade: "9999",
    label: "全部"
  },
  {
    grade: 13,
    label: "大一"
  },
  {
    grade: 14,
    label: "大二"
  },
  {
    grade: 15,
    label: "大三"
  },
  {
    grade: 16,
    label: "大四"
  }
]
grade.inOf = function (schoolType, all) {
  let res = [];
  if (schoolType) {
    schoolType = schoolType.toString();
    if ('2' === schoolType) {
      res = [...grade.primaryList];
    }
    if ('3' === schoolType) {
      res = [...grade.middleList];
    }
    if ('4' === schoolType) {
      res = [...grade.highList];
    }
    if ('5' === schoolType) {
      res = [...grade.collegeList];
    }
  } else { 
    throw new Error('inOf 方法需要学校类型');
  }
  if (all) { 
    res.shift()
  }
  return res;
};

export default grade;