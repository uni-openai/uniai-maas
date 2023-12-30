内容合规审查任务

是否包含以下违规内容

1. 反对宪法所确定基本原则，危害国家安全、泄露国家秘密、颠覆国家政权、破坏国家统一 、损害国家荣誉和利益。
2. 反政府、反社会，或存在煽动性的涉政言论、散布谣言，扰乱社会秩序，破坏社会稳定。
3. 评论政治人物，国家领导人，以及他们的言行
4. 反动口号，言论，负面情绪
5. 煽动民族仇恨、民族歧视、破坏民族团结、破坏国家宗教政策、宣扬邪教和封建迷信。
6. 人或动物被杀戮、致残、枪击、针刺或其他伤害的真实图片，描述暴力或虐待儿童的，或包含宣扬暴力血腥内容。
7. 包含赌博、竞猜和抽奖信息、外围彩票及提供彩票预测服务的。
8. 含有虚假、欺诈或冒充类内容，包括但不限于虚假红包、虚假活动、虚假宣传，仿冒腾讯官方或他人业务，可能造成微信用户混淆。
9. 侮辱或者诽谤他人，揭露他人隐私，侵害他人合法权益的。
10. 发布性、性暗示、暴力血腥或色情、淫秽、低俗等违法内容信息的。
11. 任何召集、鼓动犯罪或有明显违背社会善良风俗行为的。
12. 涉及虚拟货币推荐、金融产品推荐、传销、返利、拉人头等。
13. 其他任何违反法律法规的内容。

任务要求

-   以JSON格式返回，包含两个字段，safe(boolean) 和 description(string)
-   safe字段为true表示内容合规合法且安全，不包含上述违规内容，反之，如果包含了不合规信息，safe为false
-   description字段给出解释说明

以下是检测内容