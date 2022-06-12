/** @format */

export const titleAsciiArt = `
 ________   .---.       ,-----.    .--.      .--.    .-''-.  .-------.                _______   ,---.    ,---. ______         .-''-.  .-------.     
|        |  | I,_I|     .'  B.-,B  '.  |  |G_G     |  |  .'T_ _T   \\ |  J_ _J   \\              /   __  \\  |    \\  /    ||    X_X \`''.   .'D_ _D   \\ |  Z_ _Z   \\    
|   .----'I,-./  )I    / B,-.|  \\ _B \\ | G_( )_G   |  | / T( \` )T   '| J( ' )J  |             | H,_H/  \\__) |  ,  \\/  ,  || X_ | ) _X  \\ / D( \` )D   '| Z( ' )Z  |    
|  R_R|____ I\\  '_ '\`)I ;  B\\  '_ /  |B :|G(_ o _)G  |  |. T(_ o _)T  ||J(_ o _)J /           H,-./  )H       |  |\\K_K   /|  ||X( ''_'  )X |. D(_ o _)D  ||Z(_ o _)Z /    
|R_( )_R   | I> (_)  )I |  B_\`,/ \\ _/B  || G(_,_)G \\ |  ||  T(_,_)T___|| J(_,_)J.' __         H\\  '_ '\`)H     |  K_( )_K/ |  || X. (_) \`.X ||  D(_,_)D___|| Z(_,_)Z.' __  
R(_ o._)R__|I(  .  .-'I : B(  '\\_/ \\B   ;|  |/    \\|  |'  \\   .---.|  |\\ \\  |  |         H> (_)  )H  __ | K(_ o _)K |  ||X(_    ._)X ''  \\   .---.|  |\\ \\  |  | 
|R(_,_)R     I\`-'\`-'I|___\\ B\`"/  \\  )B / |  '  /\\  \`  | \\  \`-'    /|  | \\ \`'   /        H(  .  .-'H_/  )|  K(_,_)K  |  ||  X(_.\\.'X /  \\  \`-'    /|  | \\ \`'   / 
|   |       |        \\'. B\\_/\`\`"B.'  |    /  \\    |  \\       / |  |  \\    /          H\`-'\`-'H     / |  |      |  ||       .'    \\       / |  |  \\    /  
'---'       \`--------\`  '-----'    \`---'    \`---\`   \`'-..-'  ''-'   \`'-'             \`._____.'  '--'      '--''-----'\`       \`'-..-'  ''-'   \`'-'   
`

const rand = (min: number, max: number): number =>
	Math.floor(Math.random() * (max - min + 1) + min)

const heightFlower = 9
const flowers = [
	`       
       
 @@@@  
@@()@@ 
 @@@@  
  /    
\\ |    
\\\\|//  
^^^^^^^
`,
	`       
       
       
wWWWw  
(___)  
  Y    
\\ |/   
\\\\|/// 
^^^^^^^
`,
	`   _      
 _(_)_    
(_)@(_)   
  (_)\\    
     \`|/  
     \\|   
      | / 
   \\\\\\|// 
^^^^^^^^^^
`,
	`         
         
 vVVVv   
 (___)   
   Y     
  \\|/    
 \\ | /   
\\\\\\|///  
^^^^^^^^^
`,
	`           
   __/)    
.-(__(=:   
|\\ | \\)    
\\ ||       
 \\||       
  \\|       
   |       
^^^^^^^^^^^
`,
]

export const plantFlowers = () => {
	const colorFlowers = ["R", "I", "B", "T", "J", "H", "X", "D", "Z"]
		.map(value => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value)

	const baseArr = Array(colorFlowers.length).fill(null)
	const allFlowers = Array(heightFlower).fill(null)
	const flowersArr = baseArr
		.map(() => flowers[rand(0, flowers.length - 1)])
		.map(flower => flower.split("\n"))

	const compileFlowers = allFlowers
		.map((_, i) =>
			baseArr
				.map((_, j) =>
					!flowersArr[j][i].match(/[@\(_vw\)]/gi)
						? `${flowersArr[j][i]}`
						: `${colorFlowers[j]}${flowersArr[j][i]}${colorFlowers[j]}`
				)
				.join("")
		)
		.join("\n")

	return compileFlowers
}
