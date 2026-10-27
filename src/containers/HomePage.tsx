import banner from '../data/img/homepage_banner.jpg';
import logo from '../data/img/logo.svg';
import styles from './HomePage.module.css';

const sections = [
  {
    title: 'Geography & History',
    body: `The town of Wawona is located at 4,000 foot elevation in
      Yosemite National Park, California. It is located 4 miles north
      of the southern entrance to the park on State Route 41. The town
      is home to such places as the Pioneer History Center, the Big
      Trees Lodge (formerly the Wawona Hotel), and the Wawona
      Campground. Wawona was established in the mid 1800s, by a miner
      named Galen Clark, who fell in love with the area and build a
      cabin near a spring on the west end of the meadow. The main
      trail to Yosemite ran by his cabin, and travelers low on
      provisions would often stop and ask him for food. This led to
      the establishment of Clark's Station, which would one day become
      the Wawona Hotel. Built by the Washburn family in 1886, the
      "Long House" would eventually become the start of the current
      Wawona Hotel complex. Hosting such guests in its early history
      as President Theodore Roosevelt, John Ruskin, and Lily Langtry,
      the Wawona Hotel and the surrounding area continued under the
      direction of the Washburn family until 1932. At this time, the
      Wawona area was added to Yosemite National Park, and became a
      National Historic Landmark and Historic Hotel of America.`,
  },
  {
    title: 'Wawona Dome',
    body: `Wawona Dome is a 6,800 foot granite dome in the southern area of
      Yosemite National Park. It was formed deep within the Earth by
      the solidification of molten rock, and was subsequently exposed
      to the air by the erosion of the overlying rocks. When glaciers
      formed 2 to 3 million years ago as the Sierra Nevada mountain
      range was uplifted due to plate tectonics, their movement added
      to the continued erosion, giving Wawona Dome the relatively
      smooth shape that is shared by so many other granite domes in
      Yosemite.`,
  },
  {
    title: 'South Fork of the Merced River',
    body: `The South Fork of the Merced River meanders through the valley
      and town of Wawona. Its headwaters are high in the granite
      mountains of the southern region of Yosemite, in the eastern
      Sierra Nevada Mountains near Triple Divide Peak. The river flows
      down through the paths that were carved by the glaciers before
      it, and continues to erode them further. Running directly
      through Wawona itself, the river passes along the southern side
      of Wawona Dome. As it continues further, it picks up water from
      many streams, including streams from the Chain Lakes, Givens
      Lake, and the high country above Chilnualna Falls. Outside the
      entrance to Yosemite, the South Fork merges directly into the
      main body of the Merced River.`,
  },
];

export default function HomePage() {
  return (
    <main>
      <section className={styles.hero}>
        <img
          className={styles.heroImage}
          src={banner}
          alt='Wawona Dome lit orange at sunset above the South Fork of the Merced River'
        />
        <div className={styles.heroBody}>
          <p className={styles.place}>Wawona, CA · Elev. 4,000 ft</p>
          <h1 className={styles.mark}>
            <img src={logo} alt='' />
            Wassociates
          </h1>
        </div>
      </section>
      <div className={styles.content}>
        <p className={styles.lead}>
          Wassociates is a private, members-only secret society dedicated to
          preserving the spirit and lifestyle of certain forefathers (who shall
          remain nameless). Together, we try to deliver the experience of
          nirvana in a haphazardly maintained, slightly old-fashioned, somewhat
          run-down, yet delightful environment. By working together, we find the
          happiness we seek ... unless the electricity goes off.
        </p>
        <div className={styles.history}>
          {sections.map(({ title, body }) => (
            <section key={title} className={styles.section}>
              <h2 className={styles.heading}>{title}</h2>
              <p className={styles.body}>{body}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
