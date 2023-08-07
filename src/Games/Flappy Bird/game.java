import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import javax.swing.JPanel;
import javax.swing.Timer;
import java.awt.image.ImageObserver;
import javax.swing.ImageIcon;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

// Bird class is used to create a bird object in the game and to move it around the screen
class Bird extends GameObject {
    private ProxyImage proxyImage; // ProxyImage object used to load the image of the bird
    private Tube[] tube; // Array of Tube objects used to create the walls in the game

    // Constructor
    public Bird(int x, int y){
        super(x, y);
        if(proxyImage == null) {
            proxyImage = new ProxyImage("bird.png"); // Load the image of the bird
        }
        this.image = proxyImage.loadImage().getImage();
        this.width = image.getWidth(null); //Set the width and height of the bird
        this.height = image.getHeight(null);
        this.x -= width; // Adjust the x position of the bird
        this.y -= height; // Adjust the y position of the bird
        tube = new Tube[1]; // Create a new array of Tube objects
        tube[0] = new Tube(900, Window.HEIGHT - 60); // Create the first wall
        this.dy = 2; // Set the initial speed of the bird
    }

    // Method used to move the bird
    public void tick() {
        if(dy < 5) { // If the speed of the bird is less than 5
            dy += 2; // Increase the speed of the bird
        }
        this.y += dy; // Move the bird down the screen
        tube[0].tick(); // Move the wall down the screen
        checkWindowBorder(); // Check if the bird has hit the top or bottom of the screen
    }

    public void jump() {
        if(dy > 0) { // If the speed of the bird is greater than 0
            dy = 0; // Set the speed of the bird to 0
        }
        dy -= 15; // Move the bird up the screen
    }
    
    // Method used to check if the bird has hit the top or bottom of the screen
    private void checkWindowBorder() { 
        if(this.x > Window.WIDTH) { // If the bird has moved off the right side of the screen
            this.x = Window.WIDTH; // Set the x position of the bird to the right side of the screen
        }
        if(this.x < 0) { // If the bird has moved off the left side of the screen
            this.x = 0; // Set the x position of the bird to the left side of the screen
        }
        if(this.y > Window.HEIGHT - 50) { // If the bird has moved off the bottom of the screen
            this.y = Window.HEIGHT - 50; // Set the y position of the bird to the bottom of the screen
        }
        if(this.y < 0) { // If the bird has moved off the top of the screen
            this.y = 0; // Set the y position of the bird to the top of the screen
        }
    }

    // Method used to check if the bird has hit the wall
    public void render(Graphics2D g, ImageObserver obs) { 
        g.drawImage(image, x, y, obs); // Draw the bird
        tube[0].render(g, obs); // Draw the wall
    }
    
    
    public Rectangle getBounds() {
        return new Rectangle(x, y, width, height);
    }
}

// Tube class is used to create a wall object in the game and to move it around the screen
class TubeColumn {

    private int base = Window.HEIGHT - 60;

    private List<Tube> tubes;
    private Random random;
    private int points = 0; // Variable used to keep track of the score
    private int speed = 5; // Variable used to set the speed of the wall
    private int changeSpeed = speed; 

    public TubeColumn() { 
        tubes = new ArrayList<>();
        random = new Random();
        initTubes();
    }

    // Method used to create the wall
    private void initTubes() {

        int last = base;
        int randWay = random.nextInt(10);

        // Create the first wall in the game and set the position of the wall to the right side of the screen 
        for (int i = 0; i < 20; i++) {

            Tube tempTube = new Tube(900, last); // Create a new Tube object
            tempTube.setDx(speed); // Set the speed of the wall
            last = tempTube.getY() - tempTube.getHeight(); // Set the position of the wall
            if (i < randWay || i > randWay + 4) { // If the wall is not in the middle of the screen 
                tubes.add(tempTube); // Add the wall to the array of Tube objects
            }

        }

    }

    // Method used to check the position of the walls and to create new walls
    public void tick() { 

        for (int i = 0; i < tubes.size(); i++) { // Loop through the array of Tube objects 
            tubes.get(i).tick(); // Get the position of the wall

            if (tubes.get(i).getX() < 0) { // If the wall has moved off the left side of the screen
                tubes.remove(tubes.get(i)); // Remove the wall from the array of Tube objects
            }
        }
        if (tubes.isEmpty()) { // If the array of Tube objects is empty
            this.points += 1; // Increase the score by 1
            if (changeSpeed == points) {
                this.speed += 1; // Increase the speed of the wall by 1
                changeSpeed += 5;
            }
            initTubes(); // Create a new wall
        }

    }

    // Method used to draw the walls
    public void render(Graphics2D g, ImageObserver obs) {
        for (int i = 0; i < tubes.size(); i++) { // Loop through the array of Tube objects
            tubes.get(i).render(g, obs); // Draw the wall 
        }

    }


    public List<Tube> getTubes() {
        return tubes;
    }

    public void setTubes(List<Tube> tubes) {
        this.tubes = tubes;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

}

interface IStrategy {
    
    public void controller(Bird bird, KeyEvent kevent);
    public void controllerReleased(Bird bird, KeyEvent kevent);
}

// Controller class is used to control the movement of the bird
class Controller implements IStrategy {

    public void controller(Bird bird, KeyEvent kevent) {
    }

    public void controllerReleased(Bird bird, KeyEvent kevent) {
        if(kevent.getKeyCode() == KeyEvent.VK_SPACE) { // If the space bar is pressed bird jumps
            bird.jump();
        }
    }
    
}

interface IImage {
    public ImageIcon loadImage();
}

// ProxyImage class is used to load the image of all the objects
class ProxyImage implements IImage {

    private final String src;
    private RealImage realImage;
    
    public ProxyImage(String src) {
        this.src = src;
    }
    
    public ImageIcon loadImage() {
        if(realImage == null) { // If the image has not been loaded 
            this.realImage = new RealImage(src); // Load the image
        }
        
        return this.realImage.loadImage(); 
    }
    
}

class RealImage implements IImage {

    private final String src;
    private ImageIcon imageIcon;
    
    public RealImage(String src) {
        this.src = src;
    }
    @Override
    public ImageIcon loadImage() {
        if(imageIcon == null) {
            this.imageIcon = new ImageIcon(getClass().getResource(src));
        }
        return imageIcon;
    }
    
}

// this class is used to create the window for the game
abstract class GameObject {
    protected int x, y;
    protected int dx, dy;
    protected int width, height;
    protected Image image;

    public GameObject(int x, int y) {
        this.x = x;
        this.y = y;
    }
    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public int getDx() {
        return dx;
    }

    public int getDy() {
        return dy;
    }

    public int getWidth() {
        return width;
    }

    public int getHeight() {
        return height;
    }

    public Image getImage() {
        return image;
    }

    public void setX(int x) {
        this.x = x;
    }

    public void setY(int y) {
        this.y = y;
    }

    public void setDx(int dx) {
        this.dx = dx;
    }

    public void setDy(int dy) {
        this.dy = dy;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public void setImage(Image image) {
        this.image = image;
    }
    
    
    public abstract void tick();
    public abstract void render(Graphics2D g, ImageObserver obs);
}

// this class is used to create the walls for the game
class Tube extends GameObject {

    private ProxyImage proxyImage;
    public Tube(int x, int y) {
        super(x, y);
        if (proxyImage == null) { // If the image has not been loaded 
            proxyImage = new ProxyImage("TubeBody.png"); // Load the image

        }
        this.image = proxyImage.loadImage().getImage(); // Get the image
        this.width = image.getWidth(null); // set the width of the image
        this.height = image.getHeight(null); // set the height of the image
    }

    @Override
    public void tick() {
        this.x -= dx;
    }

    @Override
    public void render(Graphics2D g, ImageObserver obs) {
        g.drawImage(image, x, y, obs);

    }

    
    public Rectangle getBounds() {
        return new Rectangle(x, y, width, height);
    }
}

// this class is used to create the background for the game 
class Game extends JPanel implements ActionListener {

    private boolean isRunning = false; // Variable used to check if the game is running
    private ProxyImage proxyImage; // Variable used to load the image
    private Image background; // Variable used to store the image
    private Bird bird; // Variable used to store the bird object
    private TubeColumn tubeColumn; // Variable used to store the wall object
    private int score; 
    private int highScore; 

    public Game() {

        proxyImage = new ProxyImage("background.jpg"); // Load the image
        background = proxyImage.loadImage().getImage(); // Get the image
        setFocusable(true); 
        setDoubleBuffered(false);     
        addKeyListener(new GameKeyAdapter());
        Timer timer = new Timer(15, this); 
        timer.start();
    }

    @Override
    public void actionPerformed(ActionEvent e) {

        Toolkit.getDefaultToolkit().sync(); // Synchronize the display on some systems
        if (isRunning) { 
            bird.tick(); // Update the bird
            tubeColumn.tick(); // Update the wall
            checkColision(); // Check if the bird has collided with the wall
            score++; // Increase the score by 1
        }

        repaint(); 
    }

    @Override
    public void paint(Graphics g) {
        Graphics2D g2 = (Graphics2D) g;
        g2.drawImage(background, 0, 0, null);
        if (isRunning) {
            this.bird.render(g2, this);
            this.tubeColumn.render(g2, this);
            g2.setColor(Color.black);
            g.setFont(new Font("MV Boli", 1, 30));
            g2.drawString("Current score: " + this.tubeColumn.getPoints(), 10, 50);
            
        } else {
            g2.setColor(Color.black);
             g.setFont(new Font("MV Boli", 1, 50));
            g2.drawString("Press Enter to Start Game", Window.WIDTH / 2 - 350, Window.HEIGHT / 2);
            g2.setColor(Color.black);
            g.setFont(new Font("MV Boli", 1, 15));
        }
        g2.setColor(Color.black);
        g.setFont(new Font("MV Boli", 1, 30));
        g2.drawString("High Score: " + highScore, Window.WIDTH - 230, 50);

        g.dispose();
    }

    private void restartGame() {
        if (!isRunning) {
            this.isRunning = true;
            this.bird = new Bird(Window.WIDTH / 2, Window.HEIGHT / 2); // Create the bird object in the middle of the screen 
            this.tubeColumn = new TubeColumn(); // Create the wall object
        }
    }

    private void endGame() {
        this.isRunning = false;
        if (this.tubeColumn.getPoints() > highScore) { // If the current score is higher than the high score
            this.highScore = this.tubeColumn.getPoints(); // Set the high score to the current score
        }
        this.tubeColumn.setPoints(0); // Set the current score to 0

    }

    private void checkColision() {
        Rectangle rectBird = this.bird.getBounds(); // Get the bounds of the bird
        Rectangle rectTube; // Create a variable to store the bounds of the wall

        for (int i = 0; i < this.tubeColumn.getTubes().size(); i++) { // Loop through all the walls
            Tube tempTube = this.tubeColumn.getTubes().get(i); // Get the current wall
            rectTube = tempTube.getBounds(); // Get the bounds of the current wall
            if (rectBird.intersects(rectTube)) { // If the bird has collided with the wall
                endGame(); // End the game
            }
        }
    }

   
    class GameKeyAdapter extends KeyAdapter {

        private final Controller controller;

        public GameKeyAdapter() {
            controller = new Controller();
        }

        @Override
        public void keyPressed(KeyEvent e) {
            if (e.getKeyCode() == KeyEvent.VK_ENTER) {
                restartGame();
            }
        }

        @Override
        public void keyReleased(KeyEvent e) {
            if (isRunning) {
                controller.controllerReleased(bird, e);
            }
        }
    }
}

class Window {
    public static int WIDTH = 900; // Set the width of the window
    public static int HEIGHT = 600; // Set the height of the window
    public Window(int width, int height, String title, Game game) {
        JFrame frame = new JFrame();
        frame.add(game);
        frame.setTitle(title);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE); // Close the window when the user clicks the close button
        frame.setMaximumSize(new Dimension(width, height)); // Set the maximum size of the window
        frame.setPreferredSize(new Dimension(width, height)); // Set the preferred size of the window
        frame.setMinimumSize(new Dimension(width, height));     
        frame.setLocationRelativeTo(null);
        frame.setResizable(false);
        frame.setVisible(true);
        
    }

    // Run the application from here
    public static void main(String[] args) {

        Game game = new Game();
        try {
            javax.swing.UIManager.setLookAndFeel(javax.swing.UIManager.getSystemLookAndFeelClassName());
        } catch (ClassNotFoundException | InstantiationException | IllegalAccessException | javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(Window.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }

        java.awt.EventQueue.invokeLater(() -> {
            Window window = new Window(WIDTH, HEIGHT, "Flappy Bird", game);
        });
    }
}
