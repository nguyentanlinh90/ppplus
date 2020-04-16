export const version = {
  '1.0.0': {
    register: {
      version: 1,
      path: '/api/user/register',
    },
    process_otp: {
      version: 1,
      path: '/api/user/process/otp',
    },
    check_phone: {
      version: 1,
      path: '/api/user/check_phone',
    },
    send_otp: {
      version: 1,
      path: '/api/user/send/otp',
    },
    login: {
      version: 1,
      path: '/api/user/login',
    },
    logout: {
      version: 1,
      path: '/api/user/logout',
    },
    user_info_update: {
      version: 1,
      path: '/api/user/info',
    },
    get_user_info: {
      version: 1,
      path: '/api/user/info?type=',
    },
    get_jobs: {
      version: 1,
      path: '/api/job?page=',
    },
    get_job_detail: {
      version: 1,
      path: '/api/job/',
    },
    apply_job: {
      version: 1,
      path: '/api/job/apply',
    },
    get_tasks: {
      version: 1,
      path: '/api/task?page=',
    },
  },
};
