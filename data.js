const QUIZZES=[
{id:"pe1",pdf:"reviewers/PE_Reviewer_Lesson_1.pdf",title:"Physical Activity, Exercise & Physical Fitness",sub:"Definitions, health-related and skill-related fitness components",
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
{id:"pe2",pdf:"reviewers/PE_Reviewer_Lesson_1_Fitness_Concepts.pdf",title:"Lesson 1: Fitness Concepts",sub:"Movement patterns, breathing and bracing, muscle contractions, principles of training",
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
{q:"The principles of training (SPORT).",a:[["specificity"],["progressive overload"],["reversibility"],["tedium"]]}]}]}];
const countQ=q=>q.parts.reduce((n,p)=>n+p.items.length,0);
