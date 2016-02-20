// This is a JavaScript file

var SQL_LIST_OF_DML = {
  
  INSERT_DT_PROBLEM:{
    sql:'INSERT INTO dt_problem (gym_id, problem_id, wall_id, grade_kind, grade_id, intensity, risk, complex, hold_color_hex, setter_id, set_ymd, photo, crt_ymd, crt_time, crt_user, upd_ymd, upd_time, upd_user) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
    summry:'課題テーブル挿入[dt_problem]'
  },
  SELECT_PROBLEM_LIST:{
    sql:'SELECT gym_id, problem_id, photo FROM dt_problem WHERE gym_id = ? AND wall_id = ?;',
    summry:'課題一覧取得[dt_problem]',
  },
  SELECT_PROBLEM:{
    sql:'SELECT problem.gym_id, gym.gym_name, problem.problem_id, problem.wall_id, wall.wall_name, wall.slant_id, slant.slant, problem.grade_kind, problem.grade_id, grade.grade, problem.intensity, problem.risk, problem.complex, problem.hold_color_hex, problem.setter_id, setter.setter, problem.set_ymd, problem.photo FROM dt_problem problem LEFT OUTER JOIN dt_gym gym ON problem.gym_id = gym.gym_id LEFT OUTER JOIN mt_setter setter ON problem.setter_id = setter.id LEFT OUTER JOIN dt_wall wall ON problem.wall_id = wall.wall_id LEFT OUTER JOIN mt_slant slant ON wall.slant_id = slant.id LEFT OUTER JOIN mt_grade grade ON problem.grade_kind = grade.grade_kind AND problem.grade_id = grade.id WHERE problem.gym_id = ? AND problem.problem_id = ?;',
    summry:'課題詳細取得[dt_problem + dt_gym + dt_wall + mt_slant + mt_grade + mt_setter]',
  },
  UPDATE_PROBLEM_DETAIL:{
    sql:'UPDATE dt_problem SET gym_id = ?, wall_id = ?, grade_kind = ?, grade_id = ?, intensity = ? ,risk = ? ,complex = ? ,hold_color_hex = ? ,setter_id = ? ,set_ymd = ? ,photo = ?, upd_ymd = ?, upd_time = ?, upd_user = ? WHERE gym_id = ? AND problem_id = ?;',
    summry:'課題テーブル更新[dt_problem]'
  },
  
  INSERT_DT_GYM:{
    sql:'INSERT INTO dt_gym (gym_id, gym_name, area_id, photo, crt_ymd, crt_time, crt_user, upd_ymd, upd_time, upd_user) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
    summry:'施設テーブル挿入[dt_gym]'
  },
  SELECT_DT_GYM_LAST_INSERT_ROWID:{
    sql:'SELECT gym_id FROM dt_gym ORDER BY gym_id ASC;',
    summry:'最終追加施設ID取得[dt_gym]',
  },
  SELECT_DT_GYM_ALL_FOR_COMBO:{
    sql:'SELECT gym_id, gym_name FROM dt_gym;',
    summry:'施設コンボボックスリスト取得[dt_gym]',
  },
  SELECT_EXIST_GYM_AREA:{
    sql:'SELECT gym.area_id, area.area FROM dt_gym gym LEFT OUTER JOIN mt_area area ON gym.area_id = area.id WHERE gym.area_id <> "" GROUP BY gym.area_id ORDER BY gym.area_id ASC;',
    summry:'登録済みジム地域一覧取得[dt_gym + mt_area]',
  },
  SELECT_GYM_LIST:{
    sql:'SELECT gym_id, gym_name, photo FROM dt_gym WHERE area_id = ?;',
    summry:'ジム一覧取得[dt_gym]',
  },
  SELECT_GYM_DETAIL:{
    sql:'SELECT gym.gym_id, gym.gym_name, gym.area_id, area.area, gym.photo, wall.wall_id, wall.wall_name, wall.slant_id, slant.slant, wall.photo wallphoto FROM dt_gym gym LEFT OUTER JOIN dt_wall wall ON gym.gym_id = wall.gym_id LEFT OUTER JOIN mt_slant slant ON wall.slant_id = slant.id LEFT OUTER JOIN mt_area area ON gym.area_id = area.id WHERE gym.gym_id = ?;',
    summry:'ジム詳細取得[dt_gym + dt_wall + mt_slant + mt_area]',
  },
  UPDATE_GYM_DETAIL:{
    sql:'UPDATE dt_gym SET gym_name = ?, area_id = ?, photo = ?, upd_ymd = ?, upd_time = ?, upd_user = ? WHERE gym_id = ?;',
    summry:'施設テーブル更新[dt_gym]'
  },
  
  INSERT_DT_WALL:{
    sql:'INSERT INTO dt_wall (gym_id, wall_id, wall_name, slant_id, photo, crt_ymd, crt_time, crt_user, upd_ymd, upd_time, upd_user) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
    summry:'壁テーブル挿入[dt_wall]'
  },
  DELETE_DT_WALL:{
    sql:'DELETE FROM dt_wall WHERE gym_id = ?;',
    summry:'壁テーブル削除[dt_wall]',
  },
  SELECT_DT_WALL_FOR_COMBO:{
    sql:'SELECT wall.wall_id, wall.wall_name, slant.slant FROM dt_wall wall LEFT OUTER JOIN mt_slant slant ON wall.slant_id = slant.id WHERE wall.gym_id = ?;',
    summry:'壁コンボボックスリスト取得[dt_wall + mt_slant]',
  },
  
  SELECT_ALL_AREA_LIST:{
    sql:'SELECT * FROM mt_area;',
    summry:'地域マスタ取得[mt_area]'
  },
  DELETEALL_MT_AREA:{
    sql:'DELETE FROM mt_area;',
    summry:'地域マスタ削除[mt_area]',
  },
  INSERT_MT_AREA:{
    sql:'INSERT INTO mt_area (id, area) VALUES (?, ?);',
    summry:'地域マスタ挿入[mt_area]'
  },
  
  SELECT_ALL_SLANT_LIST:{
    sql:'SELECT * FROM mt_slant;',
    summry:'傾斜マスタ取得[mt_slant]'
  },
  DELETEALL_MT_SLANT:{
    sql:'DELETE FROM mt_slant;',
    summry:'傾斜マスタ削除[mt_slant]',
  },
  INSERT_MT_SLANT:{
    sql:'INSERT INTO mt_slant (id, slant) VALUES (?, ?);',
    summry:'傾斜マスタ挿入[mt_slant]'
  },

  SELECT_GRADE_LIST:{
    sql:'SELECT * FROM mt_grade WHERE grade_kind = ?;',
    summry:'グレードマスタ取得[mt_grade]'
  },
  DELETE_MT_GRADE:{
    sql:'DELETE FROM mt_grade WHERE grade_kind = ?;',
    summry:'グレードマスタ削除[mt_grade]',
  },
  INSERT_MT_GRADE:{
    sql:'INSERT INTO mt_grade (id, grade_kind, grade) VALUES (?, ?, ?);',
    summry:'グレードマスタ挿入[mt_grade]'
  },
  
  SELECT_ALL_SETTER_LIST:{
    sql:'SELECT * FROM mt_setter;',
    summry:'セッターマスタ取得[mt_setter]'
  },
  DELETEALL_MT_SETTER:{
    sql:'DELETE FROM mt_setter;',
    summry:'セッターマスタ削除[mt_setter]',
  },
  INSERT_MT_SETTER:{
    sql:'INSERT INTO mt_setter (id, setter) VALUES (?, ?);',
    summry:'セッターマスタ挿入[mt_setter]'
  }
};

var SQL_LIST_OF_DDL = {
  CREATE_MT_AREA:{
    sql:'CREATE TABLE IF NOT EXISTS "mt_area" (id TEXT , area TEXT, primary key (id));',
    summry:'地域マスタ作成[mt_area]',
  },
  CREATE_MT_SLANT:{
    sql:'CREATE TABLE IF NOT EXISTS "mt_slant" ( id TEXT, slant TEXT, PRIMARY KEY(id));',
    summry:'傾斜マスタ作成[mt_slant]'
  },
  CREATE_MT_BOULDER_GRADE_JAPAN:{
    sql:'CREATE TABLE IF NOT EXISTS "mt_grade" ( id TEXT, grade_kind TEXT, grade TEXT, PRIMARY KEY(id,grade_kind));',
    summry:'グレードマスタ作成[mt_grade]'
  },
  CREATE_MT_SETTER:{
    sql:'CREATE TABLE IF NOT EXISTS "mt_setter" ( id TEXT, setter TEXT, PRIMARY KEY(id));',
    summry:'セッターマスタ作成[mt_setter]'
  },
  CREATE_DT_WALL:{
    sql:'CREATE TABLE IF NOT EXISTS "dt_wall" ( gym_id TEXT, wall_id TEXT, wall_name TEXT, slant_id TEXT, photo BLOB, crt_ymd TEXT, crt_time TEXT, crt_user TEXT, upd_ymd TEXT, upd_time TEXT, upd_user TEXT, PRIMARY KEY(gym_id,wall_id));',
    summry:'壁テーブル作成[dt_wall]'
  },
  CREATE_DT_GYM:{
    sql:'CREATE TABLE IF NOT EXISTS "dt_gym" ( gym_id TEXT, gym_name TEXT, area_id TEXT, photo BLOB, crt_ymd TEXT, crt_time TEXT, crt_user TEXT, upd_ymd TEXT, upd_time TEXT, upd_user TEXT, PRIMARY KEY(gym_id));',
    summry:'施設テーブル作成[dt_gym]'
  },
  CREATE_DT_PROBLEM:{
    sql:'CREATE TABLE IF NOT EXISTS "dt_problem" ( gym_id TEXT, problem_id TEXT, wall_id TEXT, grade_kind TEXT, grade_id TEXT, intensity TEXT, risk TEXT, complex TEXT, hold_color_hex TEXT, setter_id TEXT, set_ymd TEXT, photo BLOB, crt_ymd TEXT, crt_time TEXT, crt_user TEXT, upd_ymd TEXT, upd_time TEXT, upd_user TEXT, PRIMARY KEY(gym_id,problem_id));',
    summry:'課題テーブル作成[dt_problem]'
  }
};