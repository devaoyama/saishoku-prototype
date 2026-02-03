import type { Partner } from "@/components/partner-card";

// ============================================
// タグマスタデータ
// ============================================
export type Tag = {
  id: string;
  name: string;
  category: "personality" | "orientation" | "culture" | "skill";
  color: string;
};

export const tags: Tag[] = [
  // 性格タグ
  { id: "t1", name: "ハイテンション", category: "personality", color: "#FF6B6B" },
  { id: "t2", name: "落ち着いている", category: "personality", color: "#4ECDC4" },
  { id: "t3", name: "論理的", category: "personality", color: "#45B7D1" },
  { id: "t4", name: "感覚的", category: "personality", color: "#F7DC6F" },
  { id: "t5", name: "社交的", category: "personality", color: "#BB8FCE" },
  { id: "t6", name: "内向的", category: "personality", color: "#85C1E9" },
  // 志向性タグ
  { id: "t7", name: "営業志向", category: "orientation", color: "#E74C3C" },
  { id: "t8", name: "企画志向", category: "orientation", color: "#3498DB" },
  { id: "t9", name: "マネジメント志向", category: "orientation", color: "#2ECC71" },
  { id: "t10", name: "スペシャリスト志向", category: "orientation", color: "#9B59B6" },
  { id: "t11", name: "年収重視", category: "orientation", color: "#F39C12" },
  { id: "t12", name: "ワークライフバランス重視", category: "orientation", color: "#1ABC9C" },
  // カルチャータグ
  { id: "t13", name: "体育会系", category: "culture", color: "#E74C3C" },
  { id: "t14", name: "静かな職場", category: "culture", color: "#5DADE2" },
  { id: "t15", name: "ベンチャー気質", category: "culture", color: "#F4D03F" },
  { id: "t16", name: "大企業志向", category: "culture", color: "#7F8C8D" },
  { id: "t17", name: "質より量", category: "culture", color: "#E67E22" },
  { id: "t18", name: "量より質", category: "culture", color: "#16A085" },
  // スキルタグ
  { id: "t19", name: "法人営業経験", category: "skill", color: "#C0392B" },
  { id: "t20", name: "個人営業経験", category: "skill", color: "#8E44AD" },
  { id: "t21", name: "マネジメント経験", category: "skill", color: "#27AE60" },
  { id: "t22", name: "新規開拓経験", category: "skill", color: "#D35400" },
];

// ============================================
// 候補者データ
// ============================================
export type Candidate = {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  currentCompany: string;
  currentPosition: string;
  currentSalary: number;
  desiredSalary: number;
  tagIds: string[];
  partnerId: string;
  status: "new" | "in_progress" | "matched" | "hired" | "declined";
  createdAt: string;
  lastContactAt: string;
  memo: string;
};

export const candidates: Candidate[] = [
  {
    id: "c1",
    name: "田中 太郎",
    email: "tanaka@example.com",
    phone: "090-1234-5678",
    age: 26,
    currentCompany: "株式会社ABC",
    currentPosition: "営業",
    currentSalary: 4000000,
    desiredSalary: 5000000,
    tagIds: ["t1", "t7", "t13", "t17", "t19"],
    partnerId: "1",
    status: "in_progress",
    createdAt: "2026-01-15",
    lastContactAt: "2026-02-01",
    memo: "転職意欲高い。営業成績トップ5の実績あり。",
  },
  {
    id: "c2",
    name: "佐藤 花子",
    email: "sato@example.com",
    phone: "090-2345-6789",
    age: 24,
    currentCompany: "株式会社DEF",
    currentPosition: "営業事務",
    currentSalary: 3200000,
    desiredSalary: 4000000,
    tagIds: ["t2", "t8", "t14", "t18", "t12"],
    partnerId: "3",
    status: "matched",
    createdAt: "2026-01-10",
    lastContactAt: "2026-01-30",
    memo: "企画職への転換希望。コミュニケーション能力高い。",
  },
  {
    id: "c3",
    name: "鈴木 一郎",
    email: "suzuki@example.com",
    phone: "090-3456-7890",
    age: 28,
    currentCompany: "株式会社GHI",
    currentPosition: "法人営業",
    currentSalary: 5500000,
    desiredSalary: 7000000,
    tagIds: ["t3", "t9", "t15", "t11", "t19", "t21"],
    partnerId: "2",
    status: "in_progress",
    createdAt: "2026-01-20",
    lastContactAt: "2026-02-02",
    memo: "マネジメント経験あり。ベンチャーへの転職希望。",
  },
  {
    id: "c4",
    name: "高橋 美咲",
    email: "takahashi@example.com",
    phone: "090-4567-8901",
    age: 25,
    currentCompany: "株式会社JKL",
    currentPosition: "カスタマーサクセス",
    currentSalary: 3800000,
    desiredSalary: 4500000,
    tagIds: ["t5", "t7", "t13", "t17", "t20"],
    partnerId: "1",
    status: "new",
    createdAt: "2026-02-01",
    lastContactAt: "2026-02-01",
    memo: "初回面談予定。",
  },
  {
    id: "c5",
    name: "伊藤 健",
    email: "ito@example.com",
    phone: "090-5678-9012",
    age: 27,
    currentCompany: "株式会社MNO",
    currentPosition: "インサイドセールス",
    currentSalary: 4200000,
    desiredSalary: 5500000,
    tagIds: ["t1", "t7", "t15", "t11", "t22"],
    partnerId: "5",
    status: "hired",
    createdAt: "2025-12-01",
    lastContactAt: "2026-01-25",
    memo: "入社決定！株式会社XYZ。",
  },
];

// ============================================
// 求人データ
// ============================================
export type Job = {
  id: string;
  companyName: string;
  title: string;
  description: string;
  minSalary: number;
  maxSalary: number;
  location: string;
  tagIds: string[];
  requirements: string[];
  benefits: string[];
  status: "active" | "paused" | "closed";
  createdAt: string;
};

export const jobs: Job[] = [
  {
    id: "j1",
    companyName: "株式会社テックスタート",
    title: "法人営業（SaaS）",
    description: "急成長中のSaaS企業で法人営業を担当していただきます。",
    minSalary: 5000000,
    maxSalary: 8000000,
    location: "東京都渋谷区",
    tagIds: ["t13", "t15", "t17", "t19"],
    requirements: ["法人営業経験2年以上", "新規開拓経験"],
    benefits: ["フレックス勤務", "リモートワーク可", "ストックオプション"],
    status: "active",
    createdAt: "2026-01-01",
  },
  {
    id: "j2",
    companyName: "大手商社株式会社",
    title: "営業企画",
    description: "営業戦略の立案・実行をリードしていただきます。",
    minSalary: 6000000,
    maxSalary: 9000000,
    location: "東京都千代田区",
    tagIds: ["t14", "t16", "t18", "t21"],
    requirements: ["営業経験3年以上", "マネジメント経験歓迎"],
    benefits: ["年間休日125日", "住宅手当", "退職金制度"],
    status: "active",
    createdAt: "2026-01-05",
  },
  {
    id: "j3",
    companyName: "株式会社グロースベンチャー",
    title: "インサイドセールス（リーダー候補）",
    description: "インサイドセールスチームの立ち上げ・運営を担っていただきます。",
    minSalary: 4500000,
    maxSalary: 7000000,
    location: "東京都港区",
    tagIds: ["t1", "t13", "t15", "t17", "t22"],
    requirements: ["インサイドセールス経験1年以上"],
    benefits: ["服装自由", "オフィス軽食無料", "書籍購入補助"],
    status: "active",
    createdAt: "2026-01-10",
  },
  {
    id: "j4",
    companyName: "株式会社ワークライフ",
    title: "カスタマーサクセス",
    description: "顧客の成功を支援し、長期的な関係構築を担当します。",
    minSalary: 4000000,
    maxSalary: 6000000,
    location: "東京都品川区",
    tagIds: ["t2", "t14", "t18", "t12"],
    requirements: ["カスタマーサポート経験", "コミュニケーション能力"],
    benefits: ["完全週休2日", "残業月10時間以下", "育休取得実績多数"],
    status: "active",
    createdAt: "2026-01-15",
  },
];

// ============================================
// 選考データ
// ============================================
export type SelectionStatus =
  | "recommended"
  | "document_screening"
  | "casual_interview"
  | "first_interview"
  | "final_interview"
  | "offer"
  | "hired"
  | "rejected"
  | "declined";

export type RejectionReason = {
  id: string;
  label: string;
};

export const rejectionReasons: RejectionReason[] = [
  { id: "r1", label: "スキル不足" },
  { id: "r2", label: "経験不足" },
  { id: "r3", label: "カルチャーアンマッチ" },
  { id: "r4", label: "年収条件不一致" },
  { id: "r5", label: "勤務地条件不一致" },
  { id: "r6", label: "候補者辞退" },
  { id: "r7", label: "他社内定承諾" },
];

export type Selection = {
  id: string;
  candidateId: string;
  jobId: string;
  partnerId: string;
  status: SelectionStatus;
  rejectionReasonId?: string;
  rejectionDetail?: string;
  matchRate: number;
  createdAt: string;
  updatedAt: string;
  memo: string;
};

export const selections: Selection[] = [
  {
    id: "s1",
    candidateId: "c1",
    jobId: "j1",
    partnerId: "1",
    status: "first_interview",
    matchRate: 85,
    createdAt: "2026-01-20",
    updatedAt: "2026-02-01",
    memo: "一次面接通過。最終面接調整中。",
  },
  {
    id: "s2",
    candidateId: "c1",
    jobId: "j3",
    partnerId: "1",
    status: "document_screening",
    matchRate: 90,
    createdAt: "2026-01-25",
    updatedAt: "2026-01-25",
    memo: "書類選考中。",
  },
  {
    id: "s3",
    candidateId: "c2",
    jobId: "j4",
    partnerId: "3",
    status: "offer",
    matchRate: 80,
    createdAt: "2026-01-15",
    updatedAt: "2026-01-28",
    memo: "内定！条件交渉中。",
  },
  {
    id: "s4",
    candidateId: "c3",
    jobId: "j2",
    partnerId: "2",
    status: "casual_interview",
    matchRate: 75,
    createdAt: "2026-01-22",
    updatedAt: "2026-01-30",
    memo: "カジュアル面談実施済み。本選考へ進む意向あり。",
  },
  {
    id: "s5",
    candidateId: "c5",
    jobId: "j1",
    partnerId: "5",
    status: "hired",
    matchRate: 88,
    createdAt: "2025-12-10",
    updatedAt: "2026-01-20",
    memo: "入社決定！2月1日入社。",
  },
  {
    id: "s6",
    candidateId: "c4",
    jobId: "j3",
    partnerId: "1",
    status: "rejected",
    rejectionReasonId: "r3",
    rejectionDetail: "静かな職場希望だが、求人は体育会系カルチャー",
    matchRate: 45,
    createdAt: "2026-01-28",
    updatedAt: "2026-01-30",
    memo: "カルチャーマッチせず。他の求人を提案予定。",
  },
];

// ============================================
// 面談ログデータ
// ============================================
export type MeetingLog = {
  id: string;
  candidateId: string;
  partnerId: string;
  type: "initial" | "follow_up" | "closing";
  date: string;
  duration: number; // minutes
  summary: string;
  nextAction: string;
  selectedTagIds: string[];
};

export const meetingLogs: MeetingLog[] = [
  {
    id: "ml1",
    candidateId: "c1",
    partnerId: "1",
    type: "initial",
    date: "2026-01-15",
    duration: 45,
    summary: "現職への不満が主な転職理由。営業成績は社内トップ5。年収500万以上を希望。",
    nextAction: "ベンチャー系営業求人を3件提案予定",
    selectedTagIds: ["t1", "t7", "t13", "t17"],
  },
  {
    id: "ml2",
    candidateId: "c1",
    partnerId: "1",
    type: "follow_up",
    date: "2026-02-01",
    duration: 30,
    summary: "株式会社テックスタートの一次面接通過。非常に前向き。",
    nextAction: "最終面接の日程調整",
    selectedTagIds: [],
  },
  {
    id: "ml3",
    candidateId: "c2",
    partnerId: "3",
    type: "initial",
    date: "2026-01-10",
    duration: 60,
    summary: "企画職への転換希望。現職では営業事務だが、企画提案の経験あり。ワークライフバランス重視。",
    nextAction: "カスタマーサクセス系の求人を提案",
    selectedTagIds: ["t2", "t8", "t14", "t18"],
  },
  {
    id: "ml4",
    candidateId: "c3",
    partnerId: "2",
    type: "initial",
    date: "2026-01-20",
    duration: 50,
    summary: "マネジメント経験を活かしたい。ベンチャーで経営に近いポジションを希望。",
    nextAction: "営業マネージャー求人を複数提案",
    selectedTagIds: ["t3", "t9", "t15", "t11"],
  },
];

// ============================================
// CV計測・ファネルデータ
// ============================================
export type CVMetrics = {
  date: string;
  source: string;
  impressions: number;
  clicks: number;
  registrations: number;
  meetings: number;
};

export const cvMetrics: CVMetrics[] = [
  { date: "2026-01-27", source: "Google広告", impressions: 5000, clicks: 250, registrations: 15, meetings: 8 },
  { date: "2026-01-27", source: "ポスティング（渋谷）", impressions: 3000, clicks: 0, registrations: 12, meetings: 6 },
  { date: "2026-01-27", source: "Instagram", impressions: 8000, clicks: 400, registrations: 10, meetings: 4 },
  { date: "2026-01-28", source: "Google広告", impressions: 4800, clicks: 230, registrations: 12, meetings: 7 },
  { date: "2026-01-28", source: "ポスティング（渋谷）", impressions: 3000, clicks: 0, registrations: 8, meetings: 4 },
  { date: "2026-01-28", source: "Instagram", impressions: 7500, clicks: 380, registrations: 8, meetings: 3 },
  { date: "2026-01-29", source: "Google広告", impressions: 5200, clicks: 260, registrations: 18, meetings: 10 },
  { date: "2026-01-29", source: "ポスティング（新宿）", impressions: 2500, clicks: 0, registrations: 10, meetings: 5 },
  { date: "2026-01-30", source: "Google広告", impressions: 4900, clicks: 240, registrations: 14, meetings: 8 },
  { date: "2026-01-30", source: "A8アフィリエイト", impressions: 12000, clicks: 350, registrations: 20, meetings: 9 },
];

export type FunnelData = {
  stage: string;
  count: number;
  conversionRate: number;
};

export const funnelData: FunnelData[] = [
  { stage: "スカウト送信", count: 500, conversionRate: 100 },
  { stage: "開封", count: 200, conversionRate: 40 },
  { stage: "返信", count: 80, conversionRate: 16 },
  { stage: "面談実施", count: 50, conversionRate: 10 },
  { stage: "推薦", count: 35, conversionRate: 7 },
  { stage: "書類通過", count: 25, conversionRate: 5 },
  { stage: "面接", count: 18, conversionRate: 3.6 },
  { stage: "最終面接", count: 10, conversionRate: 2 },
  { stage: "内定", count: 6, conversionRate: 1.2 },
  { stage: "入社決定", count: 5, conversionRate: 1 },
];

// ============================================
// パートナーデータ
// ============================================
export const partners: Partner[] = [
  {
    id: "1",
    name: "山田 花子",
    tagline: "戦略思考人材 × 寄り添いタイプ",
    bio: "大手IT企業で人事マネージャーを10年経験。20代のキャリア支援に情熱を注いでいます。あなたの強みを一緒に発見しましょう。",
    imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=face",
    tags: ["戦略思考", "寄り添いタイプ", "IT業界に強い"],
    status: "available",
    consultationType: "both",
    twitterUrl: "https://twitter.com",
    instagramUrl: "https://instagram.com",
  },
  {
    id: "2",
    name: "佐藤 健太",
    tagline: "フレンドリー × 営業特化",
    bio: "元トップ営業マン。営業職のキャリアアップを徹底サポート。雑談感覚で気軽に話しましょう！",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    tags: ["フレンドリー", "営業職特化", "年収アップ実績多数"],
    status: "busy",
    consultationType: "both",
    twitterUrl: "https://twitter.com",
  },
  {
    id: "3",
    name: "田中 美咲",
    tagline: "キャリアコーチ × マインドセット",
    bio: "キャリアコンサルタント資格保有。転職だけでなく、あなたのマインドセットから変えていきます。",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    tags: ["マインドセット", "自己分析", "女性キャリア"],
    status: "available",
    consultationType: "video",
    instagramUrl: "https://instagram.com",
  },
  {
    id: "4",
    name: "鈴木 大輔",
    tagline: "ロジカル × スピード重視",
    bio: "外資系コンサルティングファーム出身。効率的に最適な転職先を見つけるお手伝いをします。",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    tags: ["ロジカル", "スピード重視", "外資系に強い"],
    status: "offline",
    consultationType: "both",
    twitterUrl: "https://twitter.com",
  },
  {
    id: "5",
    name: "高橋 ゆり",
    tagline: "共感力 × ライフプラン設計",
    bio: "FP資格も持つキャリアアドバイザー。転職とライフプランを総合的にサポートします。",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    tags: ["共感力", "ライフプラン", "ワークライフバランス"],
    status: "available",
    consultationType: "audio",
  },
  {
    id: "6",
    name: "伊藤 翔",
    tagline: "元人事 × ベンチャー特化",
    bio: "スタートアップで人事責任者を経験。ベンチャーへの転職を考えている方、ぜひお話しましょう。",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    tags: ["ベンチャー特化", "スタートアップ", "挑戦志向"],
    status: "busy",
    consultationType: "both",
    twitterUrl: "https://twitter.com",
    instagramUrl: "https://instagram.com",
  },
];

export const checkCards = [
  {
    number: "01",
    title: "自分の市場価値が\nわからない",
    description: "今の給与は適正？もっと評価される場所はある？客観的な視点が欲しい。",
    icon: "🤔",
  },
  {
    number: "02",
    title: "転職したいけど\n何から始めれば...",
    description: "漠然とした不満はあるけど、具体的に何をすればいいかわからない。",
    icon: "😕",
  },
  {
    number: "03",
    title: "話を聞いてほしい\nだけなんだけど...",
    description: "本格的な転職活動じゃなくて、まずは誰かに相談したいだけ。",
    icon: "💭",
  },
];

export const processSteps = [
  {
    number: "01",
    title: "パートナーを選ぶ",
    description: "あなたに合いそうなパートナーを選んでください。直感でOKです。",
    color: "pink",
  },
  {
    number: "02",
    title: "今すぐor予約",
    description: "オンライン中なら即面談！忙しければ都合の良い日時を予約。",
    color: "blue",
  },
  {
    number: "03",
    title: "簡単な情報入力",
    description: "メールアドレスと簡単な相談内容を入力するだけ。",
    color: "pink",
  },
  {
    number: "04",
    title: "Zoomで面談",
    description: "顔出しなしでもOK。リラックスしてお話しましょう。",
    color: "blue",
  },
  {
    number: "05",
    title: "次のステップへ",
    description: "あなたのペースで。必要なら継続サポートも。",
    color: "pink",
  },
];

export const testimonials = [
  {
    id: "1",
    name: "M.K",
    profile: "20代後半・営業職・男性",
    highlight: "年収100万円アップで転職成功！",
    content:
      "最初は「ちょっと話聞いてほしいだけ」のつもりでした。でも、パートナーさんが自分の強みを客観的に教えてくれて、自信を持って転職活動できました。結果、年収100万円アップ！",
    imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "2",
    name: "A.S",
    profile: "20代前半・事務職・女性",
    highlight: "不安な気持ちを聞いてもらえて救われました",
    content:
      "転職するか迷っていて、誰にも相談できずモヤモヤしていました。即面談で話を聞いてもらって、自分の気持ちが整理できました。今は焦らず準備中です。",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "3",
    name: "T.Y",
    profile: "20代後半・エンジニア・男性",
    highlight: "友達に相談する感覚で気軽に話せた",
    content:
      "他のエージェントは事務的で苦手でしたが、ここは本当に「パートナー」という感じ。建前なしで本音で話せるのが良かったです。",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
  },
];

// Booking slots for a partner (mock)
export const bookingSlots = [
  { date: "2026-01-20", times: ["10:00", "11:00", "14:00", "15:00", "16:00"] },
  { date: "2026-01-21", times: ["09:00", "10:00", "11:00", "13:00", "14:00"] },
  { date: "2026-01-22", times: ["10:00", "13:00", "14:00", "17:00"] },
  { date: "2026-01-23", times: ["09:00", "11:00", "15:00", "16:00"] },
  { date: "2026-01-24", times: ["10:00", "11:00", "14:00"] },
];
