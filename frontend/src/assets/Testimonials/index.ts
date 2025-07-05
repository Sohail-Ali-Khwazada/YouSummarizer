export interface testimonial_type {
  fullName: string,
  profession: string,
  profilePic: string,
  feedback: string
}

export const testimonials:testimonial_type[]  = [
  {
    fullName: "Sarah Thompson",
    profession: "Content Creator",
    profilePic: "https://randomuser.me/api/portraits/women/44.jpg",
    feedback: "YouSummarizer is a game-changer! I can now upload long YouTube videos and get clear, concise summaries within seconds. Plus, the transcript and note-taking features make my research so much easier."
  },
  {
    fullName: "James Rodriguez",
    profession: "Digital Marketer",
    profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
    feedback: "Absolutely love using YouSummarizer for competitor analysis. Watching long webinars isn't feasible, but this tool gives me all the key points and full transcripts. Highly recommend it!"
  },
  {
    fullName: "Priya Sharma",
    profession: "Student",
    profilePic: "https://randomuser.me/api/portraits/women/65.jpg",
    feedback: "As a student, I use YouSummarizer to quickly go through lecture videos. The note-taking feature helps me stay organized, and the summaries are super accurate."
  },
  {
    fullName: "Michael Lee",
    profession: "Tech Reviewer",
    profilePic: "https://randomuser.me/api/portraits/men/85.jpg",
    feedback: "I often review tech videos and YouSummarizer saves me hours! I can extract transcripts and highlight notes as I go. It's now a part of my content workflow."
  },
  {
    fullName: "Fatima Ali",
    profession: "Educator",
    profilePic: "https://randomuser.me/api/portraits/women/12.jpg",
    feedback: "YouSummarizer helps me break down complex educational videos into digestible content for my students. The transcript and summarization are top-notch!"
  }
];
