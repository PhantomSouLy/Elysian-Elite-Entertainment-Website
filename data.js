window.EEE_DATA = {
  talents: [
    {
      id: 'airi-shimizu',
      name: 'Airi Shimizu',
      level: 'Elite Talent',
      image: 'assets/talents/airi-shimizu.jpg',
      accent: 'rose',
      availability: 'Limited',
      languages: ['Japanese', 'English'],
      description: 'Airi profiljának részletes bemutatását és végleges szolgáltatási beállításait később közösen töltjük ki. Jelenleg az EEE Elite Talent roster kiemelt tagjaként szerepel.',
      tags: ['Companion', 'Private Events', 'Dance', 'Request Only'],
      services: {
        social_companion: 'available',
        dinner_date: 'available',
        event_partner: 'available',
        girlfriend_experience: 'request',
        travel_companion: 'request',
        professional_dance: 'available',
        private_dance: 'available',
        themed_performance: 'request',
        lingerie_performance: 'request',
        nude_performance: 'request',
        adult_private_companion: 'request',
        private_intimacy: 'request',
        special_request: 'available'
      },
      interactions: {
        conversation_only: 'available',
        social_contact: 'available',
        hugging: 'available',
        kissing: 'request',
        intimate_contact: 'request',
        private_intimacy: 'request'
      },
      guests: {
        one_guest: 'available',
        couple: 'request',
        multiple_guests: 'request',
        group_event: 'request'
      }
    },
    {
      id: 'livia-hartmann', name: 'Livia Hartmann', level: 'Diamond Talent', image: 'assets/talents/livia-hartmann.jpg', accent: 'gold', availability: 'Available', languages: ['English', 'German'],
      description: 'Letisztult, magabiztos és kifinomult társasági Talent. Gálákhoz, üzleti vacsorákhoz és prémium privát eseményekhez keresett választás.',
      tags: ['Social', 'Dinner', 'Events'],
      services: {social_companion:'available', dinner_date:'available', event_partner:'available', girlfriend_experience:'request', travel_companion:'available', professional_dance:'request', private_dance:'request', special_request:'available'},
      interactions: {conversation_only:'available', social_contact:'available', hugging:'available', kissing:'request'},
      guests: {one_guest:'available', couple:'request'}
    },
    {
      id: 'naomi-reyes', name: 'Naomi Reyes', level: 'Elite Talent', image: 'assets/talents/naomi-reyes.jpg', accent: 'violet', availability: 'Available', languages: ['English', 'Spanish'],
      description: 'Energetikus, játékos és erős jelenlétű performer, aki privát partykon és táncos eseményeken érzi igazán otthon magát.',
      tags: ['Dance', 'Private Party', 'Performance'],
      services: {social_companion:'available', event_partner:'available', professional_dance:'available', private_dance:'available', themed_performance:'available', lingerie_performance:'request', special_request:'available'},
      interactions: {conversation_only:'available', social_contact:'available', hugging:'available', kissing:'request'},
      guests: {one_guest:'available', couple:'available', multiple_guests:'request', group_event:'available'}
    },
    {
      id: 'mila-laurent', name: 'Mila Laurent', level: 'Elite Talent', image: 'assets/talents/mila-laurent.jpg', accent: 'emerald', availability: 'By Request', languages: ['English', 'French'],
      description: 'Diszkrét, elegáns és nyugodt személyiség; hosszabb eseményekhez, vacsorákhoz és utazásokhoz kínál exkluzív társaságot.',
      tags: ['Companion', 'Travel', 'Luxury'],
      services: {social_companion:'available', dinner_date:'available', event_partner:'available', girlfriend_experience:'available', travel_companion:'available', private_dance:'request', special_request:'available'},
      interactions: {conversation_only:'available', social_contact:'available', hugging:'available', kissing:'available', intimate_contact:'request'},
      guests: {one_guest:'available', couple:'request'}
    },
    {
      id: 'sienna-vale', name: 'Sienna Vale', level: 'Private Talent', image: 'assets/talents/sienna-vale.jpg', accent: 'amber', availability: 'Limited', languages: ['English'],
      description: 'Merészebb performance-orientált Talent zártkörű luxusrendezvényekre és egyedi show-kra.',
      tags: ['Private', 'Performance', 'Adult 18+'],
      services: {social_companion:'available', private_dance:'available', themed_performance:'available', lingerie_performance:'available', nude_performance:'request', adult_private_companion:'request', private_intimacy:'request', special_request:'available'},
      interactions: {conversation_only:'available', social_contact:'available', hugging:'available', kissing:'available', intimate_contact:'request', private_intimacy:'request'},
      guests: {one_guest:'available', couple:'request', multiple_guests:'request'}
    },
    {
      id: 'yuna-mori', name: 'Yuna Mori', level: 'Gold Talent', image: 'assets/talents/yuna-mori.jpg', accent: 'blue', availability: 'Available', languages: ['Japanese', 'English'],
      description: 'Kedvesebb, visszafogottabb társasági profil, aki beszélgetéshez, vacsorához és elegáns partnerprogramokhoz illik.',
      tags: ['Conversation', 'Dinner', 'Companion'],
      services: {social_companion:'available', dinner_date:'available', event_partner:'available', girlfriend_experience:'request', travel_companion:'request', special_request:'available'},
      interactions: {conversation_only:'available', social_contact:'available', hugging:'request', kissing:'request'},
      guests: {one_guest:'available'}
    }
  ],
  serviceLabels: {
    social_companion: ['Social Companion', 'Partik, bárok és általános társasági jelenlét.'],
    dinner_date: ['Dinner Date', 'Vacsora és személyes társaság.'],
    event_partner: ['Event Partner', 'Gála, casino, céges vagy privát esemény kísérőpartnere.'],
    girlfriend_experience: ['Girlfriend Experience', 'Romantikusabb, személyesebb társasági élmény a Talent saját határain belül.'],
    travel_companion: ['Travel Companion', 'Utazás, yacht, resort vagy hosszabb esemény.'],
    professional_dance: ['Professional Dancer', 'Színpadi vagy rendezvényes táncos produkció.'],
    private_dance: ['Private Dance', 'Privát táncos szolgáltatás.'],
    themed_performance: ['Themed Performance', 'Tematikus show és egyedi megjelenés.'],
    lingerie_performance: ['Lingerie Performance', '18+ fehérneműs privát performance.'],
    nude_performance: ['Nude Performance', '18+ meztelen performance, kizárólag engedélyezett Talentnél.'],
    adult_private_companion: ['Adult Private Companion', '18+ privát kísérő kategória.'],
    private_intimacy: ['Private Intimacy', '18+ intim privát kategória, kizárólag előzetes Talent-jóváhagyással.'],
    special_request: ['Special Request', 'Egyedi igény leírása és külön Talent-jóváhagyás.']
  },
  interactionLabels: {
    conversation_only: ['Conversation Only', 'Maximum beszélgetés és társaság.'],
    social_contact: ['Social Contact', 'Normál társasági érintkezés.'],
    hugging: ['Hugging', 'Ölelés engedélyezhető.'],
    kissing: ['Up to Kissing', 'Maximum csókig terjedő interakció.'],
    intimate_contact: ['Intimate Contact', '18+ intimebb kontakt, Talent-jóváhagyással.'],
    private_intimacy: ['Private Intimacy', '18+ privát intimitás, külön jóváhagyással.']
  },
  guestLabels: {
    one_guest: ['One Guest', 'Egy megrendelő / egy vendég.'],
    couple: ['Couple', 'Páros megrendelés.'],
    multiple_guests: ['Multiple Guests', 'Több vendég, külön jóváhagyással.'],
    group_event: ['Group Event', 'Nagyobb privát esemény vagy társaság.']
  },
  preferenceLabels: [
    ['quiet_evening', 'Diszkrét / nyugodt este'],
    ['party_energy', 'Party / energikus hangulat'],
    ['romantic', 'Romantikus hangulat'],
    ['conversation_focus', 'Beszélgetés központú'],
    ['performance_focus', 'Performance központú'],
    ['formal', 'Formális / black tie'],
    ['casual_luxury', 'Casual luxury'],
    ['photo_allowed', 'Fotó kérés előzetes engedéllyel'],
    ['language_en', 'English preferred'],
    ['language_jp', 'Japanese preferred']
  ]
};
