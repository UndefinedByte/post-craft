//Perlin Noise in Minecraft:Java Edition

import net.minecraft.world.World;
import net.minecraft.world.chunk.IChunkGenerator;
import net.minecraft.world.chunk.IChunkProvider;
import net.minecraftforge.fml.common.IWorldGenerator;

import java.util.Random;

public class MyGenerator implements IWorldGenerator {

//GameRegistry.registerWorldGenerator(new MyGenerator(), 0); в PreInit

@Override
    public void generate(Random rnd, int chunkX, int chunkZ, World world, IChunkGenerator iChunkGenerator, IChunkProvider iChunkProvider) {
        //корды центрального чанка острова
        int cchunkX = 0;
        int cchunkZ = 0;

        boolean cg = false;
        for(int k = 0; k < 49; k++) {
            //проходим по квадрату 7x7 в поисках центра острова, если такой находится, мы генерируем чанк.
            int i = k%7-3;
            int j = k/7-3;
            if(canGenerateHere(world, chunkX+i, chunkZ+j)){
                cchunkX = chunkX + i;
                cchunkZ = chunkZ + j;

                cg = true;
                break;
            }

        }

        if(!cg)return;//если центр найден не был прекращаем генерацию

        //берем центр чанка в качестве центра острова
        int x = cchunkX*16+8;
        int z = cchunkZ*16+8;
        int y = 100;

        //здесь нужен свой рандом, зависящий от центра острова
        rnd = new Random((long)x * 341873128712L + (long)z * 132897987541L + world.getWorldInfo().getSeed() + (long)27644437);

        int r = 16+rnd.nextInt(17);//радиус острова от 16 до 32 блоков

        NoiseGeneratorPerlin perlin = new NoiseGeneratorPerlin(rnd, 2);

        //Теперь мы будем проходить цикл только в пределах нужного чанка
        int iMin = ( chunkX-cchunkX ) * 16-8;
        int iMax = ( chunkX-cchunkX+1 ) * 16-8;
        int jMin = ( chunkZ-cchunkZ ) * 16-8;
        int jMax = ( chunkZ-cchunkZ+1 ) * 16-8;

        for(int i = iMin;  i <= iMax; i++) {
            for(int j = jMin; j <= jMax; j++) {
                double l = Math.sqrt(i*i+j*j);

                int hT = (int)( perlin.getValue((x+i)/40., (z+j)/40.)*2 - (i*i+j*j)/(10.*r) );//верхний шум
                int hB = (int)( ( perlin.getValue((x+i), (z+j))-1 )*( ((r-l)/(double)r)*10>0?((r-l)/r)*10:0 ) );

                hB += (int)l-r;

                for(int k = hB; k <= hT; k++) {

                    BlockPos pos = new BlockPos(x+i, y+k, z+j);

                    IBlockState block;

                    if(k == hT) {
                        block = Blocks.GRASS.getDefaultState();
                    }else if(k > hT-4) {
                        block = Blocks.DIRT.getDefaultState();
                    }else {
                        block = Blocks.STONE.getDefaultState();
                    }
                    world.setBlockState(pos, block);
                }
            }
        }

    }
private static boolean canGenerateHere(World world, int chunkX, int chunkZ) {
        int i = chunkX;
        int j = chunkZ;

        if (chunkX < 0) {
            i = chunkX - 9;
        }

        if (chunkZ < 0) {
            j = chunkZ - 9;
        }

        i /= 15;
        j /= 15;
        i *= 15;
        j *= 15;

        Random random = new Random((long)i * 341873128712L + (long)j * 132897987541L + world.getWorldInfo().getSeed() + (long)27644437);
        i += random.nextInt(5);
        j += random.nextInt(5);

        if( i == chunkX && j == chunkZ ){
            return true;
        }

        return false;
    }


       for(int i = -r;  i <= r; i++) {
            for(int j = -r; j <= r; j++) {
                int hT = (int)(perlin.getValue((x+i)/20., (z+j)/20.)*2 + r*(1.-(i*i+j*j)/(r*r))/10.);//верхний шум
                int hB = (int)( perlin.getValue((x+i)/50., (z+j)/50.)*((r-l)/5.+7) + ( perlin.getValue((x+i), (z+j))-1 )*( ((r-l)/(double)r)*10>0?((r-l)/r)*10:0));//нижний шум можно не растягивать, но стоит увеличить котраст
                hB += Math.sqrt(i*i+j*j)-r;//собсна добавляем ту самую третью ф-ю к нашему нижнему шуму

                for(int k = hB; k <= hT; k++) {

                    BlockPos pos = new BlockPos(x+i, y+k, z+j);

                    IBlockState block;

                    if(k == hT) {
                        block = Blocks.GRASS.getDefaultState();
                    }else if(k > hT-4) {
                        block = Blocks.DIRT.getDefaultState();
                    }else {
                        block = Blocks.STONE.getDefaultState();
                    }
                    world.setBlockState(pos, block);
                }
            }
        }

