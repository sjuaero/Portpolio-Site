/*
 * 사이트에 들어가는 개인 정보와 프로젝트 데이터.
 * 문구나 수치를 고칠 때는 이 파일만 수정하면 된다.
 */

const PROFILE = {
  name: '최원빈',
  email: 'wb650219@naver.com',
  github: 'https://github.com/sjuaero',
  githubLabel: 'sjuaero',
  // 공개용 이력서 PDF(주소, 전화번호, 생년월일 제외본)를 이 경로에 넣는다.
  resume: 'assets/resume.pdf'
};

// 홈 대표 프로젝트로 보여줄 프로젝트 id (순서대로)
const FEATURED = ['f450-landing', 'water-rocket', 'gyrocopter'];

const TAG_LABEL = {
  design: '설계, 모델링',
  sim: '시뮬레이션',
  ctrl: '비행제어',
  contest: '대회'
};

/*
 * 프로젝트 상세 페이지는 모두 같은 6단계로 그려진다.
 * 01 목표 → 02 내 역할 → 03 진행 과정 → 04 수치 결과 → 05 한계와 배운 점 → 06 근거 자료
 * results 행: [항목, 목표, 결과, 비고]  (목표가 따로 없으면 '-')
 */
const PROJECTS = [
  {
    id: 'f450-landing',
    title: 'F450 비전 정밀착륙',
    subtitle: '로버가 드론을 싣고 이동하고, 드론은 방제 후 로버 위 패드에 카메라로 착륙',
    course: '자율비행체시스템설계2 (A+)',
    period: '2026-1',
    team: '5인 팀',
    role: '로버, 드론 시뮬레이션 모델링 / 카메라 보정',
    tools: ['CATIA V5', 'ROS2 Jazzy', 'PX4 SITL', 'Gazebo Harmonic', 'Python', 'OpenCV'],
    tags: ['sim', 'ctrl', 'design'],
    metric: { value: '0.0989px', label: '웹캠 ChArUco 보정 RMS' },
    cover: 'assets/img/precision_landing_p.gif',
    goal: '로버가 드론을 싣고 방제 구역으로 이동하고, 드론은 방제를 마친 뒤 로버 위 착륙 패드를 카메라로 찾아 정밀 착륙합니다. 제 파트의 목표는 실기체를 띄우기 전에 같은 미션을 시뮬레이션에서 먼저 돌려 볼 수 있도록 로버와 드론 모델을 만드는 것이었습니다.',
    mine: [
      'CATIA로 F450 어셈블리를 만들고 질량, 무게중심, 관성 텐서를 SDF에 입력 (질량 1.345kg)',
      '부품 CAD가 없는 상용 로버는 기본 도형 관성 공식(Xacro 매크로)과 CATIA 밀도 역산을 섞어 모델링',
      '아커만 조향(±0.6rad), 서스펜션(스트로크 35mm, 스프링 800N/m), 바퀴 조인트를 정의하고 RViz에서 확인',
      '로터 추력계수를 반복 계산으로 정해 Gazebo 모터 모델에 반영',
      '실제 웹캠을 ChArUco 보드로 보정하고, 보정값을 시뮬레이션 카메라에 그대로 입력'
    ],
    teamPart: ['미션 디자인', '로버, 드론 하드웨어 제작', '카메라 보정 GUI 프로그램', '비행 로그 분석'],
    process: [
      { t: 'CAD 물성', d: 'CATIA로 질량, CG, 관성 계산' },
      { t: 'URDF / SDF', d: 'Xacro 매크로, 조인트 정의' },
      { t: 'Gazebo 검증', d: 'PX4 SITL 농경지 월드 주행' },
      { t: '카메라 보정', d: '실제 웹캠 ChArUco 보정' },
      { t: '실기체 시험', d: '하방 카메라 패드 인식' }
    ],
    results: [
      ['카메라 보정 RMS', '-', '0.0989px', 'ChArUco, 실제 웹캠'],
      ['착륙 상태머신', '3단계 접근', '시뮬레이션 착륙 확인', '빨간 패드 → 체커 → ArUco, P 제어 채택'],
      ['실기체', '자동 착륙', '패드 인식까지 확인', '오프보드 자동 착륙은 미완']
    ],
    gallery: [
      { src: 'assets/img/rover_teleop_farmland.gif', cap: '로버 모델 Gazebo 주행' },
      { src: 'assets/img/real_pad_range_test.gif', cap: '실기체 카메라 패드 인식 거리 시험' }
    ],
    limits: '실기체는 하방 카메라로 빨간 패드와 ArUco 마커 4개를 인식하는 단계까지 확인했고, 오프보드 자동 착륙은 끝내지 못했습니다. 시뮬레이션 중에는 ENU(ROS, Gazebo)와 NED(PX4) 축 부호가 한 번 더 뒤집혀 제어가 발산했고, 부호를 고쳐 해결했습니다.',
    learned: '관성값과 조인트 한계를 어떻게 넣느냐에 따라 시뮬레이션 거동이 달라졌습니다. 좌표계 부호 하나로 발산하는 것을 겪은 뒤로, 모델을 넣을 때마다 단위와 축 방향을 먼저 확인합니다.',
    links: [
      { label: 'GitHub 저장소', href: 'https://github.com/sjuaero/F450-Vision-based-Precision-Landing' }
    ]
  },
  {
    id: 'f450-autopilot',
    title: 'F450 Simulink 자동비행',
    subtitle: '모터부터 6자유도까지 직접 모델링하고 캐스케이드 제어기와 웨이포인트 미션 설계',
    course: '유도제어시스템설계',
    period: '2025-2',
    team: '개인 과제 + 텀프로젝트',
    role: '동역학 모델링, 제어기 설계, Stateflow 미션',
    tools: ['MATLAB', 'Simulink', 'Stateflow'],
    tags: ['sim', 'ctrl'],
    metric: { value: '9.69분', label: '최대 호버 체공시간 계산' },
    cover: 'assets/img/autopilot_top_level.png',
    goal: 'F450 쿼드콥터의 모터, 공력, 6자유도 운동을 Simulink로 직접 모델링하고, 각 단계를 이론값과 맞춰 검증한 뒤 그 모델 위에서 자동비행 제어기와 미션을 설계합니다.',
    mine: [
      '모터: KVL과 회전운동식으로 1차 모델 (시간상수 0.0296s). 16.8V에서 1510rad/s로 이상값보다 낮아 손실이 반영됨을 확인',
      '공력: 호버 조건 4bω² = mg에서 559.11rad/s, X형 믹서가 호버에서 Fz = -14.7N, 모멘트 0으로 이론과 일치',
      '체공시간: 운동량 이론으로 최대 호버 9.69분 (1.762kg, FM 0.8, 1500mAh)',
      '6자유도: Transport theorem으로 코리올리항과 자이로 커플링을 넣고, 착지 판정 블록으로 지면 관통 방지',
      '제어: 위치 → 고도 → 자세(각도 P, 각속도 P) 캐스케이드, 기울기 ±30° 제한, 상승률 포화',
      'Stateflow 미션: 이륙 → 80m 상승 → WP1 → WP2 → 복귀 → 50m 하강 → 착륙'
    ],
    teamPart: ['(확인 후 기입) 텀프로젝트 팀 구성과 분담'],
    process: [
      { t: '모터 모델', d: '1차계, 시간상수 0.0296s' },
      { t: '공력, 믹서', d: '호버 559.11rad/s' },
      { t: '6자유도', d: '좌표 변환, 중력, 착지 판정' },
      { t: '캐스케이드 제어', d: '위치, 고도, 자세' },
      { t: 'Stateflow 미션', d: '웨이포인트 비행' }
    ],
    results: [
      ['호버 회전수', '이론 559.11rad/s', '모델과 일치', '4bω² = mg'],
      ['호버 힘', '-14.7N', '일치, 모멘트 0', 'X형 믹서'],
      ['최대 호버 체공', '-', '9.69분', '1.762kg, FM 0.8'],
      ['비대칭 입력 시험', '-', '약 1.7초에 발산', '원인: 오일러각 짐벌락']
    ],
    gallery: [
      { src: 'assets/img/wk2_motor_speed_16v8.png', cap: '16.8V 입력 모터 속도 응답' },
      { src: 'assets/img/wk7_hover_result.png', cap: '6자유도 모델 호버 결과' },
      { src: 'assets/img/gimbal_lock_attitude.png', cap: '비대칭 입력에서 짐벌락으로 인한 발산' }
    ],
    limits: '모터 1번 +20, 3번 -20rad/s의 비대칭 입력을 주자 약 1.7초 만에 발산했습니다. θ가 90°에 가까워질 때 생기는 오일러각 짐벌락이 원인이었고, 쿼터니언으로 바꾸면 해결된다는 결론까지 냈습니다.',
    learned: '단계마다 이론값과 모델 출력을 먼저 맞춰 본 뒤 다음 단계로 넘어갔기 때문에, 이상 응답이 나왔을 때 원인을 좌표 표현 문제로 빠르게 좁힐 수 있었습니다.',
    links: [
      { label: 'GitHub 저장소', href: 'https://github.com/sjuaero/F450-Autopilot-simulation' }
    ]
  },
  {
    id: 'water-rocket',
    title: '탁구공 사출 물로켓',
    subtitle: '1.5L 페트병 하나로 50m 착탄, 25m 지점에서 탁구공 사출',
    course: '로켓공학및설계 PBL (A0)',
    period: '2026-1',
    team: '3인 팀',
    role: '탁구공 사출 장치 설계, 지연 시간 해석',
    tools: ['CATIA V5', 'MATLAB', 'OpenRocket', 'Arduino'],
    tags: ['design', 'sim'],
    metric: { value: '160.7ms', label: '사출 지연 예측 (실측 167ms)' },
    cover: 'assets/img/ejection_module.png',
    goal: '1.5L 페트병 하나로 만든 물로켓이 50m를 날아가고, 비행 중 25m 지점에서 탁구공을 사출해야 합니다. 저는 사출 장치를 맡았고, 명령을 내린 뒤 공이 실제로 나가기까지 걸리는 시간을 미리 알아내는 것이 핵심이었습니다.',
    mine: [
      '방식 선정: 1안(서보 + 평행링크 개폐문 + 스프링)은 부품이 많고 작동이 길어 버리고, 2안(SG90 회전 실린더 + 고무줄 슬링샷) 채택',
      '고무줄 사출 시간: 비선형 탄성 모델로 뉴턴 2법칙 ODE를 세우고 RK4(ode45)로 풀어 약 6ms, 사출속도 9.443m/s',
      '서보 작동 시간: CATIA로 실린더 관성을 구하고 실측 질량 0.045kg을 반영해 1차 ODE로 계산',
      '전자 지연: 센서, 통신, PWM 주기를 합쳐 33.5ms',
      '세 지연을 더해 160.7ms를 예측하고, 240fps 슬로모션으로 167ms를 실측해 비행 코드에 반영'
    ],
    teamPart: ['(확인 후 기입) 기체 구조와 안정성 해석, 비행 소프트웨어, 궤적 시뮬레이션 분담'],
    process: [
      { t: '방식 비교', d: '개폐문 대 슬링샷' },
      { t: '고무줄 ODE', d: 'RK4, 약 6ms' },
      { t: '서보 1차계', d: 'CATIA 관성 반영' },
      { t: '전자 지연 합산', d: '33.5ms' },
      { t: '슬로모션 검증', d: '240fps, 167ms' }
    ],
    results: [
      ['사출 지연', '-', '예측 160.7ms / 실측 167ms', '차이 7ms'],
      ['비행거리', '50m', '56.6m', '예측 49.04m'],
      ['사출 지점', '25m', '약 23.7m', '영상 프레임 분석'],
      ['비행 중 안정여유', '-', '0.243 ~ 0.276cal', 'OpenRocket, CG 257mm']
    ],
    gallery: [
      { src: 'assets/img/rocket_assembly.png', cap: '기체 어셈블리' },
      { src: 'assets/img/flight_trajectory.jpg', cap: '영상으로 복원한 비행 궤적' },
      { src: 'assets/img/simscape_flight_1.gif', cap: 'Simscape 비행 시뮬레이션' }
    ],
    limits: 'BLE 장애로 비행 데이터를 받지 못해 영상 프레임으로 궤적을 복원했습니다. 비행거리가 예측보다 길었던 원인으로 배풍 3m/s, 유량계수 과소평가, 발사 감지 지연을 찾았습니다.',
    learned: '구동부 지연을 단계별로 나눠 예측하고 실측으로 확인하면, 어느 단계에서 시간이 새는지 보입니다. 예측과 실측의 차이 7ms를 그대로 코드에 반영했습니다.',
    links: [
      { label: 'GitHub 저장소', href: 'https://github.com/sjuaero/Water-rocket-with-Pingpong-ball-ejection-mission' }
    ]
  },
  {
    id: 'gyrocopter',
    title: '자이로콥터 대회',
    subtitle: '제17회 부산대 창의비행체 경진대회, 대학부 자이로콥터 부문',
    course: '교외 경진대회',
    period: '2025.07 ~ 2025.08',
    team: '5인 팀, 부팀장',
    role: '메인로터, 틸트 / 티터링 허브 설계',
    tools: ['CATIA V5', '3D 프린팅', 'Pixhawk 6C Mini'],
    tags: ['design', 'contest'],
    metric: { value: '1.3 → 1.0kg', label: '주차별 설계 공유로 경량화' },
    cover: 'assets/img/aircraft_v2_render_1.png',
    goal: '무동력 로터로 양력을 얻는 자이로콥터를 설계하고 제작해 대회에서 비행합니다. 핵심은 경량화로 무게 대비 양력을 높이는 것이었습니다.',
    mine: [
      '로터 직경 850mm (헤드 45 + 블레이드 380mm), Align 380 카본 2엽 블레이드',
      '코닝각 1.5°: 논문의 안정 영역을 근거로 블레이드 뿌리 굽힘 모멘트와 진동을 줄이도록 설정',
      '티터링 힌지 허브로 전진, 후퇴 블레이드의 양력 비대칭을 자동 보정',
      '틸트 허브 -3°와 허브 +3°를 조합해 전진 블레이드 +6°, 후퇴 0°',
      '롤링 마운트(Ø14.5mm 축)와 클레비스로 서보 링키지 연결',
      '파트를 합치니 1.3kg → 주차별 설계 공유를 제안해 1.0kg으로 감량'
    ],
    teamPart: ['동체, 카본 프레임', '꼬리날개, 노즈콘 CFD', '추진, 항전 배선'],
    process: [
      { t: '이론 근거', d: '코닝각, 티터링, 틸트' },
      { t: 'CATIA 설계', d: '허브, 마운트, 링키지' },
      { t: '3D 프린팅', d: '재출력 10회 이상' },
      { t: '양력 시험', d: '드릴과 저울' },
      { t: '시험비행', d: '1회 성공' }
    ],
    results: [
      ['기체 중량', '-', '1.3kg → 1.0kg', '설계 공유, 부품 정리'],
      ['디스크하중', '-', '22.5 → 17.3N/m²', '경량화 효과'],
      ['비행', '대회 비행', '시험비행 1회 성공', '대회 당일 실패']
    ],
    gallery: [
      { src: 'assets/img/rotor_exploded.png', cap: '로터 헤드 분해도' },
      { src: 'assets/img/rotor_hub_tilt.png', cap: '틸트 허브' },
      { src: 'assets/img/nosecone_cfd.png', cap: '노즈콘 CFD (팀)' }
    ],
    limits: '단일 푸셔 모터의 반토크 문제로 트윈 모터를 제안해 시험비행은 1회 성공했지만, 대회 당일 비행은 실패했습니다. 부품 공차를 맞추지 못해 재출력이 10회 넘게 반복됐습니다.',
    learned: '파트별로 따로 설계하면 무게와 간섭은 합칠 때 드러납니다. 그 뒤로는 설계 공유 주기를 먼저 정하고, 공차를 제대로 배우려고 항공우주제도및CAD 과목을 따로 수강했습니다.',
    links: [
      { label: 'GitHub 저장소', href: 'https://github.com/sjuaero/Modeling-Gyrocopter-' }
    ]
  },
  {
    id: 'coursework',
    title: '수업 프로젝트 모음',
    subtitle: 'F-16 트림과 선형화, 425 정찰위성 궤도 설계 앱',
    course: '비행동역학, 우주궤도역학',
    period: '2025-1',
    team: '개인 과제 / 5인 팀',
    role: 'F-16 트림 해석, 위성 궤도 앱 UI',
    tools: ['MATLAB', 'Simulink', 'App Designer'],
    tags: ['sim'],
    metric: { value: '5.108°', label: 'F-16 트림 받음각' },
    cover: null,
    goal: '비행동역학과 우주궤도역학 수업에서 해석 코드와 앱을 직접 만들어, 수업에서 배운 식이 실제 시뮬레이션에서 어떻게 나오는지 확인했습니다.',
    mine: [
      'F-16 (개인): 운동방정식 블록의 상태미분과 쿼터니언 정규화를 직접 작성',
      'F-16: 430ft/s, 10,000ft에서 트림 (받음각 5.108°), 선형화 후 5개 모드 고유값이 안정임을 확인',
      'F-16: 러더 더블릿 100초 응답을 해석하다가 β 트림 오차를 발견',
      '425 위성 (5인 팀): App Designer로 앱 UI를 만들고 앱 파트 보고서 작성'
    ],
    teamPart: ['425 위성: 궤도 계산, RAAN 탐색, KORSAT 궤도 비교'],
    process: [
      { t: '운동방정식', d: '상태미분, 쿼터니언' },
      { t: '트림', d: '430ft/s, 10,000ft' },
      { t: '선형화', d: '종, 횡 방향 행렬' },
      { t: '모드 해석', d: '고유값 5개' },
      { t: '응답 검증', d: '러더 더블릿' }
    ],
    results: [
      ['F-16 트림 받음각', '-', '5.108°', '430ft/s, 10,000ft'],
      ['고유값', '안정', '5개 모드 모두 안정', '선형화 모델'],
      ['425 위성 앱', '-', 'UI, 보고서 담당', 'SSO 97.5°']
    ],
    gallery: [],
    limits: '425 위성 과제는 RAAN을 1° 간격으로 탐색해 오차가 남았고, 빔 피복은 반영하지 못했습니다.',
    learned: '(작성 예정) 이 과제에서 배운 점 한두 문장',
    links: []
  }
];
