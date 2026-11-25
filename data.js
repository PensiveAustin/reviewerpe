const SUBJECTS=[
{id:"pathfit",name:"PathFit",full:"Physical Education",sub:"Fitness concepts, movement, and training principles",badge:"PF"},
{id:"ensci",name:"Ensci",full:"Environmental Science",sub:"Quizzes and reviewers for Environmental Science",badge:"ES"},
{id:"purcom",name:"PURCOM",full:"Purposive Communication",sub:"Communication process, models, forms, 7 Cs, and ethics",badge:"PC"}
];
const QUIZZES=[
{id:"pe1",subject:"pathfit",pdf:"reviewers/PE_Reviewer_Lesson_1.pdf",title:"Physical Activity, Exercise & Physical Fitness",sub:"Definitions, health-related and skill-related fitness components",
parts:[
{t:"mcq",name:"Multiple Choice",ins:"Choose the best answer.",items:[
{q:"Any bodily movement produced by skeletal muscles that requires energy.",o:["Physical activity","Exercise","Physical fitness","Flexibility"],a:0},
{q:"A type of physical activity that is planned, structured, repetitive, and performed to improve or maintain fitness.",o:["Physical activity","Exercise","Physical fitness","Agility"],a:1},
{q:"Which is an example of exercise?",o:["Climbing stairs","Dancing at a party","Swimming laps","Walking to class"],a:2},
{q:"Which is a health-related fitness component?",o:["Agility","Balance","Flexibility","Speed"],a:2},
{q:"Which is a skill-related fitness component?",o:["Muscular endurance","Reaction time","Body composition","Cardiovascular endurance"],a:1},
{q:"A plank hold mainly shows which component?",o:["Muscular strength","Muscular endurance","Power","Agility"],a:1},
{q:"Power combines strength and ____.",o:["Balance","Speed","Flexibility","Coordination"],a:1},
{q:"Which is NOT part of fat-free mass?",o:["Muscles","Bones","Body water","Fat mass"],a:3}]},
{t:"match",name:"Matching Type",ins:"Match each skill-related component to its definition. Pick the letter.",items:[
["Agility","Change direction and body position quickly while maintaining control."],
["Balance","Maintain stability while stationary or moving."],
["Coordination","Use body parts together smoothly and efficiently."],
["Power","Exert force quickly; combines strength and speed."],
["Reaction time","Time needed to respond to a stimulus."],
["Speed","Perform a movement or cover distance quickly."]]},
{t:"id",name:"Identification",ins:"Type the term being described.",items:[
{q:"Ability of the heart, lungs, and circulatory system to deliver oxygen during sustained activity.",a:["cardiovascular endurance","cardiorespiratory endurance"]},
{q:"Ability of a muscle or muscle group to exert force against resistance.",a:["muscular strength"]},
{q:"Ability of a joint or group of joints to move through an appropriate range of motion.",a:["flexibility"]},
{q:"The relative proportions of fat mass and fat-free mass in the body.",a:["body composition"]},
{q:"The ability to perform daily activities efficiently without excessive fatigue, while retaining energy for recreation and unexpected demands.",a:["physical fitness"]}]},
{t:"enum",name:"Enumeration",ins:"List all items. Order does not matter.",items:[
{q:"The 5 health-related fitness components.",a:[["cardiovascular endurance","cardiorespiratory endurance"],["muscular strength"],["muscular endurance"],["flexibility"],["body composition"]]},
{q:"The 6 skill-related fitness components.",a:[["agility"],["balance"],["coordination"],["power"],["reaction time"],["speed"]]},
{q:"4 examples of physical activity.",a:[["walking"],["climbing stairs"],["dancing"],["cycling"]]}]}]},
{id:"pe2",subject:"pathfit",pdf:"reviewers/PE_Reviewer_Lesson_1_Fitness_Concepts.pdf",title:"Lesson 1: Fitness Concepts",sub:"Movement patterns, breathing and bracing, muscle contractions, principles of training",
parts:[
{t:"mcq",name:"Multiple Choice",ins:"Choose the best answer.",items:[
{q:"Which is NOT one of the five components of physical fitness in the lesson?",o:["Body composition","Flexibility","Agility","Cardiorespiratory endurance"],a:2},
{q:"How many fundamental movement patterns are there?",o:["Five","Six","Seven","Eight"],a:2},
{q:"Which movement is executed by kicking your butt back and leaning your torso forward while maintaining a neutral spine?",o:["Squat","Lunge","Hinge","Gait"],a:2},
{q:"Mostly focusing on a long and relaxing exhale and proper inhale is called ____.",o:["Breathing","Bracing","Hinge","Gait"],a:0},
{q:"Which contractions generate force by changing the length of the muscle?",o:["Isometric","Isotonic","Static","Reversible"],a:1},
{q:"Which contractions cause muscles to elongate in response to a greater opposing force?",o:["Concentric","Isometric","Eccentric","Isotonic"],a:2},
{q:"Which contractions generate force without changing the length of the muscle?",o:["Isometric","Concentric","Eccentric","Isotonic"],a:0},
{q:"Fitness levels are lost when you stop exercising.",o:["Specificity","Progressive overload","Reversibility","Tedium"],a:2}]},
{t:"match",name:"Matching Type",ins:"Match each fundamental movement to its description. Pick the letter.",items:[
["Pull","Consists of pulling a weight toward your body or your body towards your hands."],
["Push","Involves pushing a weight away from your body or your body away from an object."],
["Squat","Considered to be the most complex movement the human body is capable of."],
["Lunge","Involves your body in a less stable position of one foot further forward than the other."],
["Gait","The technique of walking."],
["Rotation","Unique from the other six movements because of the plane that it works in."]]},
{t:"id",name:"Identification",ins:"Type the term being described.",items:[
{q:"Forceful holding of breath that uses a higher threshold strategy to stabilize the thorax and pelvis.",a:["bracing"]},
{q:"Contractions that cause muscles to shorten, thereby generating force.",a:["concentric","concentric contraction","concentric contractions"]},
{q:"Making training specific to the sport or activity being played or performed.",a:["specificity"]},
{q:"Gradually increasing the amount of overload so that fitness gains occur, without the potential for injury.",a:["progressive overload"]},
{q:"The boredom that can occur from training the same way every time.",a:["tedium"]}]},
{t:"enum",name:"Enumeration",ins:"List all items. Order does not matter.",items:[
{q:"The 5 components of physical fitness.",a:[["body composition"],["flexibility"],["muscular strength"],["muscular endurance"],["cardiorespiratory endurance","cardiovascular endurance"]]},
{q:"The 7 fundamental movement patterns.",a:[["pull"],["push"],["squat"],["lunge"],["hinge"],["rotation"],["gait"]]},
{q:"The principles of training (SPORT).",a:[["specificity"],["progressive overload"],["reversibility"],["tedium"]]}]}]},
{id:"ensci1",subject:"ensci",pdf:"reviewers/Science_Reviewer_Nature_of_Science.pdf",files:[{n:"Reviewer 1: Study Guide",k:"PDF",f:"reviewers/Science_Reviewer_Nature_of_Science.pdf"},{n:"Reviewer 2: Nature of Science Infographic (sent by sir)",k:"PNG",f:"reviewers/Nature_of_Science_Infographic.png"},{n:"Reviewer 3: Lecture Slides (Inquiry & Scientific Method) (sent by sir)",k:"PPT",f:"reviewers/Lecture_Inquiry_and_Scientific_Method.ppt"}],title:"Nature of Science & Scientific Inquiry",sub:"Discovery vs hypothesis-based science, data, reasoning, theories, and the scientific method",
parts:[
{t:"mcq",name:"Multiple Choice",ins:"Choose the best answer.",items:[
{q:"The search for information and explanation.",o:["Hypothesis","Theory","Inquiry","Technology"],a:2},
{q:"The word science is derived from Latin and means ____.",o:["To know","To build","To observe","To test"],a:0},
{q:"Which approach describes natural structures and processes based on observation and data analysis?",o:["Hypothesis-based science","Discovery science","Technology","Model building"],a:1},
{q:"Recorded measurements, often organized into tables and graphs, are called ____.",o:["Qualitative data","Hypothesis","Theory","Quantitative data"],a:3},
{q:"Drawing a general conclusion from many specific observations is called ____.",o:["Deduction","Induction","Prediction","Falsification"],a:1},
{q:"Which is an example of qualitative data?",o:["Describing the feather patterns of a finch","Measuring beak depth as 13.4 mm","Plotting beak length on a graph","Recording the mass of 20 finches"],a:0},
{q:"Which must be true of a scientific hypothesis?",o:["It must be proven true","It must rely on supernatural causes","It must be accepted by everyone","It must be testable and falsifiable"],a:3},
{q:"Compared to a hypothesis, a scientific theory is ____.",o:["A guess with no supporting evidence","Narrower in scope","Broader in scope and supported by more evidence","A law that has been proven"],a:2}]},
{t:"match",name:"Matching Type",ins:"Match each term to its definition. Pick the letter.",items:[
["Model","A representation of a natural phenomenon, such as a diagram, 3D object, computer program, or equation."],
["Technology","Applies scientific knowledge for a specific purpose."],
["Peer review","Ideas and methods are critically evaluated by other scientists."],
["Scientific law","Describes what happens in nature, often as a concise statement or equation."],
["Reproducible","Results can be repeated by independent researchers."],
["Falsifiable","Able to be shown false by observation or experiment."]]},
{t:"id",name:"Identification",ins:"Type the term being described.",items:[
{q:"Data that are descriptions rather than measurements.",a:["qualitative data","qualitative"]},
{q:"Reasoning that uses general premises to make specific predictions (the if...then logic).",a:["deduction","deductive reasoning","deductive"]},
{q:"A tentative answer to a well-framed question.",a:["hypothesis","scientific hypothesis"]},
{q:"The idealized, textbook process of inquiry that scientists rarely follow step by step.",a:["scientific method","the scientific method"]},
{q:"Kind of explanation that science cannot support or falsify because it is outside the bounds of science.",a:["supernatural","supernatural explanation","supernatural explanations"]}]},
{t:"enum",name:"Enumeration",ins:"List all items. Order does not matter.",items:[
{q:"The first 5 steps of the scientific method.",a:[["observation"],["question"],["hypothesis"],["prediction"],["test experiment","test","experiment","testing"]]},
{q:"The 6 characteristics of science (nature of science).",a:[["empirical"],["testable"],["reproducible"],["peer reviewed","peer review"],["tentative but reliable","tentative"],["self correcting","selfcorrecting"]]},
{q:"The 4 forms a scientific model can take.",a:[["diagrams","diagram"],["three dimensional objects","three dimensional object","3d objects","3d object","3 d objects"],["computer programs","computer program"],["mathematical equations","mathematical equation","equations","equation"]]}]}]},
{id:"purcom1",subject:"purcom",pdf:"reviewers/PURCOM_Module_1.pdf",title:"Lesson 1: Communication Process",sub:"Nature of communication, Berlo's elements, levels, models, and verbal and non-verbal forms",
parts:[
{t:"mcq",name:"Multiple Choice",ins:"Choose the best answer.",items:[
{q:"The word communication comes from the Latin word 'communis', which means ____.",o:["Message","Common","Speak","Symbol"],a:1},
{q:"Which is NOT one of the four attributes of communication as a process?",o:["Dynamic","Systematic","Linear","Symbolic interaction"],a:2},
{q:"'Meanings are in people, not in words.' This attribute is called ____.",o:["Dynamic","Systematic","Symbolic interaction","Meaning is personally constructed"],a:3},
{q:"Purposive communication is best described as communication that is ____.",o:["Random and unplanned","Intentional and within the bounds of specific contexts","Done only through writing","Limited to face-to-face talks"],a:1},
{q:"In Berlo's Model, who initiates the communication process?",o:["Receiver","Channel","Source","Effect"],a:2},
{q:"Which message factor refers to the decisions the source makes in selecting and arranging both code and content?",o:["Message code","Message content","Message treatment","Message effect"],a:2},
{q:"Which is an example of an overt effect?",o:["A private change in attitude","Nodding of the head","A hidden feeling","An unspoken opinion"],a:1},
{q:"Which element of communication is anything that disrupts the smooth flow of communication?",o:["Feedback","Noise","Channel","Code"],a:1},
{q:"Which model is a one-way linear model that introduced the element of noise?",o:["Laswell's Model","Newcomb's Model","Shannon and Weaver's Model","Dance's Helical Model"],a:2},
{q:"What is the main limitation of Laswell's Model?",o:["It has too many elements","It omits feedback","It has no source","It has no message"],a:1},
{q:"In Newcomb's Model, when A and B have different attitudes about X, what must they do?",o:["Stop communicating","Communicate to restore balance","Ignore X","Change the channel"],a:1},
{q:"According to Edward T. Hall, proxemics is the way people communicate through their use of ____.",o:["Touch","Smell","Space in relation to other people","Time"],a:2},
{q:"Intonation, pitch, loudness, and intensity in speech are called ____.",o:["Paralanguage","Proxemics","Artifacts","Kinesics"],a:0}]},
{t:"match",name:"Matching Type",ins:"Match each term to its description. Pick the letter.",items:[
["Laswell's Model","Asks: Who says what, in which channel, to whom, with what effect?"],
["Shannon and Weaver's Model","Made by Bell Telephone engineers; a one-way model with a noise source."],
["Newcomb's Model","Shows how communication keeps equilibrium in a social system (A, B, X)."],
["Osgood and Schramm's Model","Actors are equal in encoding, interpreting, and decoding messages."],
["Dance's Helical Model","Portrays communication as moving and ever-changing, like a spiral."],
["Intrapersonal communication","Communication with oneself."],
["Interpersonal communication","Person-to-person, often face-to-face communication."],
["Mass communication","Uses technological devices like radio, TV, or social media to reach large audiences."]]},
{t:"id",name:"Identification",ins:"Type the term being described.",items:[
{q:"The person or group with a purpose for engaging in communication; also called the encoder or sender.",a:["source","the source"]},
{q:"The person or group at the other end of the communication process; the target of the message.",a:["receiver","the receiver"]},
{q:"Any group of symbols structured in a way that is meaningful to some person.",a:["message code","code"]},
{q:"The modes of encoding and decoding messages, such as speaking.",a:["channel","the channel"]},
{q:"The type of effect that is non-observable but sometimes the most important.",a:["covert effect","covert"]},
{q:"Communication through touch, a way of conveying feelings without words.",a:["tactile"]},
{q:"Form of non-verbal communication that refers to smell, such as cologne or perfume.",a:["olfactory"]},
{q:"Form of non-verbal communication that refers to communication through taste.",a:["gustatory"]}]},
{t:"enum",name:"Enumeration",ins:"List all items. Order does not matter.",items:[
{q:"The 6 elements of Berlo's Model of Communication.",a:[["source"],["message"],["channel"],["receiver"],["effect"],["feedback"]]},
{q:"The 3 factors of a message.",a:[["message code","code"],["message content","content"],["message treatment","treatment"]]},
{q:"The 3 levels of communication.",a:[["intrapersonal","intrapersonal communication"],["interpersonal","interpersonal communication"],["mass","mass communication"]]},
{q:"The 4 attributes of communication as a process.",a:[["dynamic"],["systematic"],["symbolic interaction"],["meaning is personally constructed","meaning personally constructed"]]},
{q:"The 5 auditory forms of non-verbal communication.",a:[["silence"],["paralanguage"],["tactile"],["olfactory"],["gustatory"]]}]}]},
{id:"purcom2",subject:"purcom",pdf:"reviewers/PURCOM_Module_1.pdf",title:"Lesson 2: Principles and Ethics of Communication",sub:"The 7 Cs of communication, communication ethics, and principles of ethical communication",
parts:[
{t:"mcq",name:"Multiple Choice",ins:"Choose the best answer.",items:[
{q:"Which is NOT one of the 7 Cs of communication?",o:["Clear","Concrete","Creative","Courteous"],a:2},
{q:"Avoiding jargon and using simple language makes a message more ____.",o:["Clear","Complete","Coherent","Courteous"],a:0},
{q:"Errors in facts or grammar reduce your credibility. Which C is being broken?",o:["Concise","Correct","Concrete","Courteous"],a:1},
{q:"Giving the recipient all the information they need, including explicit guidance on a call to action, makes a message ____.",o:["Complete","Concise","Clear","Coherent"],a:0},
{q:"Being specific and basing arguments on solid facts from credible sources makes a message ____.",o:["Concrete","Concise","Correct","Courteous"],a:0},
{q:"'Don't use 10 words if you can use five.' This describes being ____.",o:["Complete","Concise","Coherent","Correct"],a:1},
{q:"Showing empathy and respect for the audience makes a message ____.",o:["Courteous","Concrete","Clear","Complete"],a:0},
{q:"A logical flow with consistent style, tone, and language makes a message ____.",o:["Concise","Concrete","Coherent","Correct"],a:2},
{q:"Ethics is best defined as ____.",o:["A set of school rules","A system of moral principles","A communication model","A type of feedback"],a:1},
{q:"Which is NOT a fundamental of ethical communication?",o:["Responsible thinking","Decision making","Development of communication and communities","Winning every argument"],a:3},
{q:"An ethical communicator should strive to understand and respect other communicators ____.",o:["After responding to them","Before evaluating and responding to their messages","Only when they agree","Only in formal settings"],a:1},
{q:"Sharing information, opinions, and feelings when facing significant choices should also respect ____.",o:["Popularity","Speed","Privacy and confidentiality","Authority"],a:2}]},
{t:"match",name:"Matching Type",ins:"Match each C of communication to its description. Pick the letter.",items:[
["Clear","Has a clear purpose and avoids jargon."],
["Correct","Free of factual and grammar errors."],
["Complete","Gives the recipient all the information needed."],
["Concrete","Specific, with solid facts and examples."],
["Concise","Short and simple; sticks to the point."],
["Courteous","Polite, respectful, and considerate of the audience's point of view."],
["Coherent","Has a logical flow with consistent tone and style."],
["Ethics","Deals with the rightness and wrongness of actions and the goodness and badness of motives."]]},
{t:"id",name:"Identification",ins:"Type the term being described.",items:[
{q:"The C of communication that asks you to give the recipient everything they need to follow your reasoning.",a:["complete"]},
{q:"The C of communication that means keeping your message short and avoiding repetition.",a:["concise"]},
{q:"The C of communication that requires consistency of style, tone, and language throughout.",a:["coherent","considered"]},
{q:"A system of moral principles.",a:["ethics"]},
{q:"The principles governing the right and wrong, moral and immoral aspects of interpersonal communication.",a:["communication ethics","ethics of interpersonal communication","ethics of communication"]},
{q:"The C that is reduced when your audience spots errors, causing them to be distracted.",a:["correct"]},
{q:"According to the principles, you should accept responsibility for the short- and long-term ____ of your own communication.",a:["consequences","consequence"]},
{q:"The C that lets the audience see the relevance of your message through examples and irrefutable data.",a:["concrete"]}]},
{t:"enum",name:"Enumeration",ins:"List all items. Order does not matter.",items:[
{q:"The 7 Cs of communication.",a:[["clear"],["correct"],["complete"],["concrete"],["concise"],["courteous"],["coherent","considered"]]},
{q:"The 3 fundamentals of ethical communication.",a:[["responsible thinking"],["decision making"],["development of communication and communities","development of communication and community"]]},
{q:"6 qualities your messages should have to be courteous.",a:[["friendly"],["professional"],["considerate"],["respectful"],["open"],["honest"]]},
{q:"Two things communication ethics looks at: the balance between speaking and listening, and the degree of ____ and ____.",a:[["criticism"],["praise"]]}]}]}];
/* ---- ADDING ENSCI QUIZZES ----
Copy a whole PE quiz object above ({id:"pe1",...}), paste it right before the closing "];" of QUIZZES,
then change: id -> "ensci1" (then "ensci2"), subject -> "ensci", pdf, title, sub, and the questions.
Same parts + same item counts as PE is fine. (Run supabase-ensci.sql once for the leaderboard tables.) */
const countQ=q=>q.parts.reduce((n,p)=>n+p.items.length,0);
