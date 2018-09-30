export const appURL = {
    ipServer: 'http://localhost:3000/api/',
    // ipServer: 'http://203.158.110.142/api/',
};

export const redirectLink = {
    homePage: 'pages/home',
    loginPage: 'login',
    downloadPage: 'pages/download',

    // ---------- Profile ----------
    studentProfile: 'pages/account/Student',
    teacherProfile: 'pages/account/Teacher',
    adminProfile: 'pages/account/Administrator',

    // ---------- Grade History ---------
    gradeStudent: 'pages/grade-history/student',
    gradeTeacher: 'pages/grade-history/teacher',
    teacherAddGrade: 'pages/grade-history/teacher-add',

    // ---------- Prediction ---------
    singlePrediction: 'pages/prediction/single',
    singleResult: 'pages/prediction/single/result',
    groupPrediction: 'pages/prediction/group',
    groupResult: 'pages/prediction/group/results',
    teacherPrediction: 'pages/prediction/single-teacher',
};
