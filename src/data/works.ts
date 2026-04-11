export type Category = 'poetry' | 'short-stories' | 'prose' | 'novels';

export interface Work {
  id: string;
  title: string;
  category: Category;
  genre: string;
  author?: string;
  content: string;
  date: string;
  featured?: boolean;
}

export const works: Work[] = [
  {
    id: 'the-quiet-hours',
    title: 'The Quiet Hours',
    category: 'poetry',
    genre: 'Reflective',
    content: `In the quiet hours when the world holds its breath,
I find the words that daylight steals away.
The moon keeps secrets better than the sun—
she knows the weight of silence, understands
the beauty found in shadows left unspoken.

Between the tick and tock of sleeping clocks,
my pen moves like a ghost across the page,
tracing the outline of forgotten dreams
and memories that shimmer, fade, return.

The quiet hours belong to those who listen,
who understand that darkness isn't empty
but full of whispered truths too soft for noon.
Here, in this velvet space before the dawn,
I am most myself, most truly home.`,
    date: '2024-03-15',
    featured: true,
  },
  {
    id: 'letters-never-sent',
    title: 'Letters Never Sent',
    category: 'poetry',
    genre: 'Melancholic',
    content: `I keep them in a drawer that sticks,
these letters I have written to the dead,
to lovers lost, to versions of myself
I've shed like autumn leaves along the way.

Each envelope a small confession sealed,
each page a bridge to someone unreachable—
not because of distance, death, or time,
but because some words must stay unspoken
to keep their power, their raw and holy weight.

What would it change to send them now?
The dead stay dead, the past remains the past,
and I have learned that silence has its uses,
its kindness and its necessary grace.

So here they rest, these letters never sent,
proof that love outlasts its speaking,
that memory is its own form of mail,
delivered every night in dreams.`,
    date: '2024-02-20',
  },
  {
    id: 'the-glass-house',
    title: 'The Glass House',
    category: 'short-stories',
    genre: 'Literary Fiction',
    content: `She inherited the house from an aunt she never knew existed. The letter from the solicitor arrived on a Tuesday, unremarkable in every way except for its contents: a glass house on the Norfolk coast, and a woman named Esther who had watched the sea for sixty years alone.

Clara drove north on a grey October morning, the kind of day that seemed designed for revelations. The house appeared through the mist like something imagined—walls of glass reflecting clouds, waves, and her own uncertain face.

Inside, everything was light. Even on this dull day, the rooms glowed with a soft luminescence, as if the glass had learned to store sunshine for darker hours. Esther's things remained: a reading chair by the eastern wall, books arranged by colour rather than author, a collection of sea glass in every shade of green.

Clara found the journals on her third day. Leather-bound, filled with her aunt's precise handwriting, they documented not just a life but a philosophy: "To live in glass is to refuse the lie of privacy. We are all translucent, whether we admit it or not. I chose to admit it."

She stayed that winter, and the next. The house taught her things she hadn't known she needed to learn—how to be seen, how to stop hiding, how to let light pass through her without fear.

When visitors asked why she'd stayed, Clara would gesture to the sea, the sky, the walls that held nothing back. "I came here to sort through an inheritance," she'd say. "I found something else entirely."`,
    date: '2024-01-10',
    featured: true,
  },
  {
    id: 'morning-ritual',
    title: 'Morning Ritual',
    category: 'prose',
    genre: 'Personal Essay',
    content: `Every morning is a small death and resurrection.

I wake before the sun, in that grey hour when night loosens its grip but day hasn't quite arrived. The coffee maker gurgles in the kitchen like an old friend clearing their throat. I've come to love this sound, this herald of consciousness.

The ritual is always the same: water first, cold and cleansing. Then the coffee, bitter and dark. I sit by the window that faces east and wait for the light to find me.

This is not meditation, exactly, though silence is required. It's more like preparation—the way a diver prepares to enter water, the way a musician prepares to play. I am making myself ready for the day's work, which is the work of paying attention.

The French have a term, "l'heure bleue," for this time when everything is possible because nothing has happened yet. In this blue hour, I am not a writer or a woman or a collection of responsibilities. I am simply present, watching the world remember itself.

By the time the sun appears, I have already lived a small lifetime. The day that follows is a gift, but this morning hour is something else—a secret, a sanctuary, a practice of hope.

Some mornings the ritual fails. The silence fills with worry, the coffee tastes like ash, the light arrives without miracle. On those days, I trust the practice more than the feeling. I show up anyway, morning after morning, believing that presence is its own reward.`,
    date: '2024-02-01',
  },
  {
    id: 'the-cartographers-daughter',
    title: "The Cartographer's Daughter",
    category: 'novels',
    genre: 'Historical Fiction',
    content: `Chapter One: The Inheritance

My father spent his life drawing lines on paper and calling them truth. As a child, I thought this was magic—the way he could conjure mountains from contour lines, rivers from blue threads, entire countries from careful measurements and patient ink.

"Maps are lies," he told me once, when I was old enough to understand. "But they're useful lies. They help us navigate the world without getting lost."

I remember looking at his latest work, a survey of the Scottish Highlands commissioned by some lord with too much land and too little time to walk it. Every burn and ben rendered in meticulous detail, every settlement named, every road traced.

"But this isn't a lie," I said. "These places exist."

He smiled—that particular smile he wore when I'd said something both right and wrong. "The places exist, yes. But the map is not the place. A map is a story we tell about space, and like all stories, it chooses what to include and what to leave out."

I didn't understand then. I was twelve, and the world still seemed like something that could be fully known, fully captured on paper.

It would take me forty years, three continents, and the loss of everyone I loved before I finally understood what he meant.

This is not a map. This is the story of how I learned that some territories can never be charted—how the most important journeys leave no trace on paper, and how the truest borders are the ones we draw inside ourselves.

(Continued...)`,
    date: '2023-11-15',
    featured: true,
  },
  {
    id: 'what-the-river-knows',
    title: 'What the River Knows',
    category: 'poetry',
    genre: 'Nature',
    content: `The river carries more than water—
it holds the memory of mountains,
the patience of stone slowly worn,
the secret languages of fish
who speak in silver and in shadow.

I come here when words fail me,
when the page stays blank for days
and silence feels less like peace
than a wall I cannot scale.

The river asks no questions,
demands no explanations.
It simply flows, has always flowed,
will flow when I am gone—
and in that continuity, I find
a strange and steadying comfort.

Here is what the river knows:
that endings are illusions,
that everything returns to source,
that the truest path forward
is always the path of least resistance
moving inevitably toward the sea.

I trail my fingers in the current,
feel time rush through my hands,
and for a moment—just a moment—
I am not separate from this flow.
I am the water and the stone,
the question and the answer,
the writer and the written.`,
    date: '2024-03-01',
  },
  {
    id: 'the-last-bookshop',
    title: 'The Last Bookshop',
    category: 'short-stories',
    genre: 'Contemporary',
    content: `The sign said "Marginalia" in faded gold letters, and the shop itself seemed to exist slightly out of time—a pocket of stillness in the rushing city, a haven of paper in a world gone digital.

Mr. Chen had run the bookshop for forty-seven years. He knew the location of every volume, could recommend a book based on nothing more than the way a customer stood, the worry in their eyes, the particular quality of their loneliness.

"You need poetry," he told the businesswoman in the grey suit, pressing a slim volume of Rilke into her hands. "Trust me."

She returned a week later, crying quietly between the shelves. "How did you know?" she asked.

Mr. Chen only smiled. "The books know. I just listen."

The city council had sent three notices about the lease, each more threatening than the last. The building was old, they said. Valuable. A developer wanted to turn it into luxury flats with exposed brick and heritage appeal.

"But the books," Mr. Chen said to his daughter when she visited on Sundays. "Where will they go?"

She had no answer. She worked in tech, lived in a apartment full of screens, hadn't read a physical book in years. But she remembered childhood afternoons in the shop, the smell of old paper, the way dust motes danced in the light through the window.

The auction happened on a Tuesday. Mr. Chen watched from across the street as workers carried out boxes of books like caskets. Some went to collectors, most to recycling. The Rilke that had made the businesswoman cry was bought by a man who wanted it for the colour of its spine.

That night, Mr. Chen dreamed of a library without end, shelves stretching into infinity, and woke to find that his daughter had created something: a digital archive of every book he'd ever sold, every note he'd written in the margins, every recommendation recorded in his careful script.

"It's not the same," he said, scrolling through the glowing screen.

"No," she agreed. "But it's not nothing, either."

In the margins of the digital file, he began to type.`,
    date: '2023-12-05',
  },
  {
    id: 'on-solitude',
    title: 'On Solitude',
    category: 'prose',
    genre: 'Philosophical',
    content: `Solitude chose me before I chose it.

I was a child who preferred corners to centers, who found crowds exhausting in ways I couldn't articulate. While other children clustered and competed, I drifted to the edges of rooms, of playgrounds, of conversations. Not unhappy, exactly—just elsewhere.

It took decades to understand this as a gift rather than a deficiency.

Our culture treats solitude with suspicion. To be alone is to be lonely, we're told. To be lonely is to have failed at the fundamental human project of connection. We fill our lives with noise and company, treating silence as an enemy to be conquered.

But there's a difference—a vast and crucial difference—between loneliness and being alone. Loneliness is an ache, an absence, a room with missing furniture. Being alone, truly and purposefully alone, is something else entirely.

In solitude, I find the room to hear myself think. The space to notice what I actually feel, rather than what I'm supposed to feel. The quiet necessary for the kind of attention that good writing requires.

Writers need solitude the way plants need water. We need those hours of uninterrupted thought, those days when no one expects anything of us, those stretches of time when we can follow an idea down whatever rabbit hole it leads.

This isn't loneliness. This is work. This is practice. This is how we grow.

Virginia Woolf knew this. So did Dickinson, holed up in her Amherst room. So does anyone who has ever sat down to make something real from nothing but thought and time.

Solitude isn't the enemy of connection. It's the ground from which genuine connection grows. We can only offer our true selves to others if we've spent time alone with those selves, getting to know them, making peace with their contradictions and hungers.

I am never less alone than when I am by myself, my pen moving across paper, the world held at bay by these four walls and this purposeful silence.`,
    date: '2024-01-25',
  },
];

export const getCategoryWorks = (category: Category): Work[] => {
  return works.filter(work => work.category === category);
};

export const getWork = (id: string): Work | undefined => {
  return works.find(work => work.id === id);
};

export const getFeaturedWorks = (): Work[] => {
  return works.filter(work => work.featured);
};

export const categoryLabels: Record<Category, string> = {
  'poetry': 'Poetry',
  'short-stories': 'Short Stories',
  'prose': 'Prose',
  'novels': 'Novels',
};
