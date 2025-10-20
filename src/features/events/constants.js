import { uid } from "./lib/uid";

export const ALL_CATEGORIES = [
  "お祭り","ワークショップ","スポーツ","子ども向け","シニア向け","家族向け","世代間交流","文化・芸術","防災","清掃ボランティア","フリマ","交流会",
];

export const SEED = [
  { id: uid(), title: "みんなで公園クリーンアップ", date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString().slice(0, 16), location: "渋谷区 代々木公園", categories: ["清掃ボランティア", "交流会"], description: "手ぶらOK。軍手とトングはこちらで用意します。終了後に軽い交流会あり。", capacity: 30, attendees: 12, liked: false },
  { id: uid(), title: "地域防災ミニ講座", date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString().slice(0, 16), location: "世田谷区 三軒茶屋太子堂出張所", categories: ["防災"], description: "非常食の備え方と家庭内の安全対策を30分で学びます。", capacity: 50, attendees: 41, liked: true },
  { id: uid(), title: "商店街 夏まつり", date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString().slice(0, 16), location: "板橋区 仲宿商店街", categories: ["お祭り", "文化・芸術"], description: "過去イベントの記録。来年の開催に向けたボランティア募集も。", capacity: 200, attendees: 180, liked: false },
  { id: uid(), title: "親子で楽しむ工作教室", date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString().slice(0, 16), location: "新宿区 区民センター", categories: ["子ども向け", "ワークショップ"], description: "3歳から小学生まで参加可能。親子で一緒に楽しく工作を楽しみましょう。", capacity: 20, attendees: 15, liked: false },
  { id: uid(), title: "シニア向け健康体操", date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString().slice(0, 16), location: "品川区 総合区民会館", categories: ["シニア向け", "スポーツ"], description: "椅子に座ってできる軽い体操です。初心者の方も大歓迎。", capacity: 25, attendees: 18, liked: true },
  { id: uid(), title: "世代間交流 お茶会", date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString().slice(0, 16), location: "目黒区 区民会館", categories: ["世代間交流", "交流会"], description: "老若男女問わず参加できるお茶会。地域の皆さんとの交流を深めましょう。", capacity: 40, attendees: 22, liked: false },
  { id: uid(), title: "家族で楽しむピクニック大会", date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString().slice(0, 16), location: "練馬区 光が丘公園", categories: ["家族向け", "スポーツ"], description: "親子で参加できる楽しいピクニック大会。お弁当持参でお気軽にご参加ください。", capacity: 60, attendees: 35, liked: false },
  { id: uid(), title: "家族向け防災体験", date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 21).toISOString().slice(0, 16), location: "杉並区 防災センター", categories: ["家族向け", "防災"], description: "親子で学ぶ防災知識。消火器の使い方や避難訓練を体験できます。", capacity: 30, attendees: 18, liked: true },
];
