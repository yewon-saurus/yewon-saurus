import { writeFileSync } from 'node:fs';
import Parser from "rss-parser";

let yewonReadme = ``;
const markdownPre = `# Hi there! 👋

My name is Yewon Kim.

I'm a Front-End developer who knows how to look at it from a **user's point of view**.

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fyewon0804%2Fyewon0804&count_bg=%23FF4A9E&title_bg=%23565863&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

<table>
  <th>
    <h2>👾 My Tech Stack 👾</h2>
  </th>
  <th>
    <h2>👇 This is my blog 👇</h2>
  </th>
  <tr>
    <td rowspan="2">
      
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/></a>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black"/></a>

<img src="https://img.shields.io/badge/Python-3766AB?style=flat-square&logo=Python&logoColor=white"/></a>

<img src="https://img.shields.io/badge/Java-CA4626?style=flat-square&logo=Java&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Kotlin-7F52FF?style=flat-square&logo=Kotlin&logoColor=white"/></a>

<img src="https://img.shields.io/badge/Linux-FCC624?style=flat-square&logo=Linux&logoColor=black"/></a>
<img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/></a>
    </td>
    <td>
✨ *List of recent articles* ✨`;

const markdownPost = `
    </td>
  </tr>
  <tr>
    <td>
      
✨ *List of popular articles* ✨


- [2023. 11. 19.] <a href=https://velog.io/@yewon0804/KT-AIVLE-School인공지능-능력시험-AICE-Associate-시험-후기>[KT AIVLE]인공지능 능력시험 AICE Associate 시험 후기</a>
- [2023. 7. 25.] <a href=https://velog.io/@yewon0804/KT-AIVLE-SchoolKT-에이블스쿨-4기-AI-개발자-트랙-최종-합격>[KT AIVLE]에이블스쿨 4기 - AI 개발자 최종 합격</a>
- [2023. 2. 18.] <a href=https://velog.io/@yewon0804/GitHub-APIOctokit-사용하기>GitHub API(Octokit) 사용하기</a>
- [2022. 12. 3.] <a href=https://velog.io/@yewon0804/YOLOv5커스텀-모델의-객체-탐지-결과-띄우기-with-Flask-REST-API>[YOLOv5]커스텀 모델의 객체 탐지 결과 띄우기(REST API) with Flask</a>
- [2022. 6. 18.] <a href=https://velog.io/@yewon0804/구름-IDE에서-MySQL-사용하기>goorm IDE에서 MySQL 사용하기</a>
- [2022. 6. 18.] <a href=https://velog.io/@yewon0804/시스템-호출-제작>[Linux]시스템 호출 제작</a>
    </td>
  </tr>
</table>
`;

// rss-parser 생성
const parser = new Parser({
    headers: {
        Accept: 'application/rss+xml, application/xml, preMarkdown/xml, text/xml; q=0.1',
    }
});

(async () => {
    // 피드 목록
    const tistoryFeed = await parser.parseURL('https://ywwwon01.tistory.com/rss');
    const velogFeed = await parser.parseURL('https://v2.velog.io/rss/yewon0804');

    // 앞 부분 합체
    yewonReadme += markdownPre;

    // Tistory 최근 게시글 5개
    yewonReadme += `\n\n<strong>📙 Tistory</strong>\n`;
    for (let i = 0; i < 5; i++) {
        yewonReadme += addFeedItem(tistoryFeed.items[i]);
    }

    // Velog 최근 게시글 2개
    yewonReadme += `\n\n<strong>📗 Velog</strong>\n`;
    for (let i = 0; i < 2; i++) {
        yewonReadme += addFeedItem(velogFeed.items[i]);
    }

    // 뒷 부분 합체
    yewonReadme += markdownPost;

    // README.md 파일 작성
    writeFileSync('README.md', yewonReadme, 'utf8', (e) => {
        console.log(e)
    })

    console.log('업데이트 완료')
}) ();

function addFeedItem(item) {
    let {title, link, pubDate} = item;
    pubDate = new Date(pubDate);
    const [year, month, date] = [pubDate.getFullYear(), pubDate.getMonth() + 1, pubDate.getDate()];
    return `\n- [${year}. ${month}. ${date}.] <a href=${link}>${title}</a>`;
}