/**
 * Default orchestration
 */
export const orchestration = {
    init:{},
    enter:{
        transition:{when:'beforeChildren', staggerChildren:0.08}
    },
    exit:{
        transition:{when:'afterChildren', staggerChildren:0.08}
    }
}